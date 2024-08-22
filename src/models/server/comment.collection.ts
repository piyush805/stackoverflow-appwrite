import { commentCollection, db } from "@/models/name";
import { databases } from "./config";
import { Permission } from "node-appwrite";

export default async function createCommentCollection() {
  // create collection
  await databases.createCollection(db, commentCollection, commentCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("Comment collection created");

  // creating attributes and indexes

  await Promise.all([
    databases.createStringAttribute(db, commentCollection, "content",10000,true), // markdown
    databases.createEnumAttribute(db, commentCollection, "type", ["answer", "question"], true), 
    databases.createStringAttribute(db, commentCollection, "typeId", 50, true), 
    databases.createStringAttribute(db, commentCollection, "authorId", 50, true),
  ]);

  console.log("Comment attributes created");
}
