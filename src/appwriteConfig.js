import { Account, Client, Databases } from "appwrite";

export const PROJECT_ID = "6650deda0016e43e4325";
export const DATABASE_ID = "6650ffab000bdda47c37";
export const COLLECTION_ID = "6650ffb4001f2a164951";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6650deda0016e43e4325");

export const databases = new Databases(client);
export const account = new Account(client);
export default client;
