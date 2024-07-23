import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new sdk.Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('669988ad000b6c4a6841').setKey('0602e239fb486d352b31058724bbeba03a09394809ee22fa8268beb53cfbb9f670b6f55e9bf70f108f97f0abeb6eb32aaa78163d2d8f814c9f0360d76260b453c7c93253a8fd9c8103191cc06234dd902ef61d2ab9f527743073303621380b52c46a72998d336cebffd519849177ac09b0c36e52a8bb5ee4fb1dede24540eabb');

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
