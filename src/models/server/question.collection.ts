import { IndexType } from "node-appwrite";

import { db, questionCollection } from "@/models/name";
import { databases } from "./config";
import { Permission } from "appwrite";

export default async function createQuestionCollection() {
  // create collection
  await databases.createCollection(db, questionCollection, questionCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("Question collection is created");

  // creating attributes and indexes

  await Promise.all([
    databases.createStringAttribute(db, questionCollection, "title", 100, true),
    databases.createStringAttribute(db, questionCollection, "content", 10000, true), // markdown
    databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
    databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true),
    databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false), // not required
  ]);

  console.log("Question attributes created");

  // Create Indexes

  await Promise.all([
    databases.createIndex(
        db, questionCollection, "title", IndexType.Fulltext, ["title"],["asc"]
    ),
    databases.createIndex(
        db, questionCollection, "content", IndexType.Fulltext, ["content"],["asc"]
    ),
  ])
}