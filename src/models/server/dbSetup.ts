import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreateStorage() {
  try {
    await databases.get(db);
    console.log("Databases connection");
  } catch (error) {
    try {
      await databases.create(db, db);
      // refactor below code
      console.log("database created");
      await Promise.all([
        createAnswerCollection(),
        createCommentCollection(),
        createQuestionCollection(),
        createVoteCollection(),
      ]);
      console.log("Collections created");
      console.log("Database connected");
    } catch (error) {
      console.log("Error creating databases or collection", error);
    }
  }
  return databases;
}
