import { Db, MongoClient } from "mongodb";

const { DATABASE_URL, DATABASE_NAME } = process.env;

// check the MongoDB URI
if (!DATABASE_URL) {
  throw new Error("Define the MONGODB_URI environmental variable");
}

if (!DATABASE_NAME) {
  throw new Error("Define the DATABASE_NAME environmental variable");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDB() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      dbClient: cachedClient,
      db: cachedDb,
    };
  }
  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000,
  };

  // Connect to cluster
  const client = new MongoClient(DATABASE_URL as string, opts);
  await client.connect();
  const db = client.db(DATABASE_NAME);
  console.log("connected to database");
  // set cache
  cachedClient = client;
  cachedDb = db;
  console.log("cached connection instance");

  return {
    dbClient: cachedClient,
    db: cachedDb,
  };
}
