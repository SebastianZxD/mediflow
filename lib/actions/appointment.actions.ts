'use server';

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases, messaging, users } from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";
import { getUser } from "./patient.actions";

//Create Appointment
export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
}

//Get Appointment Details

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};

//Get All Appointments
export const getRecentAppointmentsList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    }

    const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
      if (appointment.status === 'scheduled') {
        acc.scheduledCount++;
      } else if (appointment.status === 'pending') {
        acc.pendingCount++;
      } else if (appointment.status === 'cancelled') {
        acc.cancelledCount++;
      }

      return acc;
    
    }, initialCounts);

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents
    }

    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
}

// SMS NOTIFICATION

export const sendSMSNotification = async (userId: string, content: string) => {
  try { 
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId],
    );
    return parseStringify(message);
  } catch (error) {
    console.error("An error occurred while sending sms:", error);
  }
};

//Update Appointment

export const updateAppointment = async ({ appointmentId, userId, appointment, type }: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) throw Error;

    // const smsMessage = `Greetings from CarePulse. ${type === "schedule" ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.`;
    // await sendSMSNotification(userId, smsMessage);

    const smsMessage = `
      Hi, it's MediFlow. 
      ${type === 'schedule' 
        ?`Your appointment has been scheduled for ${formatDateTime(appointment.schedule!).dateTime} with the Dr. ${appointment.primaryPhysician}.
        Please remember to arrive at least 15 minutes before the appointment.` 
        :`We regret to inform, you that your appointment has been cancelled for the following reason: ${appointment.cancellationReason}.
        If you would like further details please contact us at 696-420-6969. Te amo Mamooor :)`
      }
    `

    await sendSMSNotification(userId, smsMessage);

    revalidatePath('/admin')
    return parseStringify(updatedAppointment);

  } catch (error) {
    console.log(error);
  }
}
