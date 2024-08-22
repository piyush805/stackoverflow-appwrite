/**
 * This enables frontend to be able to talk to any point in the database
 * Ref from" appwrite__cloud__client-web
 */

import env from "@/app/env";
import { Client, Account, Avatars, Databases, Storage } from "appwrite";

const client = new Client()
            .setEndpoint(env.appWrite.endpoint)
            .setProject(env.appWrite.projectId);

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export { client, account, databases, avatars, storage };
