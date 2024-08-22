import { IndexType, Permission } from "node-appwrite";

import { db, voteCollection } from "@/models/name";
import { databases } from "./config";

export default async function createVoteCollection() {
  // create collection
  await databases.createCollection(db, voteCollection, voteCollection, [
    // there can be n number of role from the appwrite, by default there are two - 'any' and 'user'
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("Vote collection is created");

  // creating attributes and indexes

  await Promise.all([
    databases.createStringAttribute(db, voteCollection, "title", 100, true),
    databases.createStringAttribute(db, voteCollection, "content", 10000, true), // markdown
    databases.createStringAttribute(db, voteCollection, "authorId", 50, true),
    databases.createStringAttribute(db, voteCollection, "tags", 50, true, undefined, true), // last true for string[]
    databases.createStringAttribute(db, voteCollection, "attachmentId", 50, false), // not required
  ]);

  console.log("Vote attributes created");

  // Create Indexes

  await Promise.all([
    databases.createIndex(
        db, voteCollection, "title", IndexType.Fulltext, ["title"], ["asc"]
    ),
    databases.createIndex(
        db, voteCollection, "content", IndexType.Fulltext, ["content"], ["asc"]
    ),
  ])
}
