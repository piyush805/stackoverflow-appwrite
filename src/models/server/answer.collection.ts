import { IndexType } from "node-appwrite";

import { answerCollection, db } from "@/models/name";
import { databases } from "./config";
import { Permission } from "appwrite";

export default async function createAnswerCollection() {
  // create collection
  await databases.createCollection(db, answerCollection, answerCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("Answer collection is created");

  // creating attributes and indexes

  await Promise.all([
    databases.createStringAttribute(
      db,
      answerCollection,
      "content",
      10000,
      true
    ), // markdown
    databases.createStringAttribute(
      db,
      answerCollection,
      "questionId",
      50,
      true
    ),
    databases.createStringAttribute(db, answerCollection, "tags", 50, true),
    databases.createStringAttribute(db, answerCollection,
      "attachmentId",50,false
    ), // not required
  ]);

  console.log("Question attributes created");

  // Create Indexes

  await Promise.all([
    databases.createIndex(
      db,
      answerCollection,
      "title",
      IndexType.Fulltext,
      ["title"],
      ["asc"]
    ),
    databases.createIndex(
      db,
      answerCollection,
      "content",
      IndexType.Fulltext,
      ["content"],
      ["asc"]
    ),
  ]);
}
