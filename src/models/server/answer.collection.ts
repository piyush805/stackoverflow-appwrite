import { answerCollection, db } from "@/models/name";
import { databases } from "./config";
import { Permission } from "node-appwrite";

export default async function createAnswerCollection() {
  // create collection
  await databases.createCollection(db, answerCollection, answerCollection, [
    Permission.create("users"),
    Permission.read("any"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("Answer collection created");

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
    databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
  ]);

  console.log("Answer attributes created");
}
