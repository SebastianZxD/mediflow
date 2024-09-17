import React from 'react'
import Image from 'next/image'
import AppointmentForm from '@/components/forms/AppointmentForm'
import { getPatient } from '@/lib/actions/patient.actions'

import * as Sentry from '@sentry/nextjs';

const NewAppointment = async ({ params: { userId }}: SearchParamProps) => {
  const patient = await getPatient(userId);

  Sentry.metrics.set("user_view_new-appointment", patient.name);

  return (
    <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[860px] flex-1 justify-between">
        <div className="flex flex-row">
          <Image 
            src="/assets/icons/logo-icon.webp"
            height={1000}
            width={1000}
            alt="Patient"
            className="mb-12 h-[2.5rem] w-fit rounded-[5px] border border-blue-500"
          />
          <h1 className="font-bold text-3xl ml-2">Medi Flow</h1>
        </div>
        <AppointmentForm 
          type="create" 
          userId={userId}
          patientId={patient.$id}  
        />
        <p className="copyright mt-10 py-12">
          © 2024 MediFlow
        </p>
      </div>
    </section>
    <Image 
      src="/assets/images/appointment-img.png"
      height={1000}
      width={1000}
      alt="patient"
      className="side-img max-w-[390px] bg-bottom"
    />
  </div>
  )
}

export default NewAppointment