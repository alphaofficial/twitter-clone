import { Db, MongoClient } from "mongodb";

const { DATABASE_URL, DATABASE_NAME } = process.env;

// check the MongoDB URI
if (!DATABASE_URL) {
  throw new Error("Define the MONGODB_URI environmental variable");
}

if (!DATABASE_NAME) {
  throw new Error("Define the DATABASE_NAME environmental variable");
}

global.mongo = global.mongo || {};

export async function connectToDB() {
  // check the cached.
  // if (cachedClient && cachedDb) {
  //   // load from cache
  //   return {
  //     dbClient: cachedClient,
  //     db: cachedDb,
  //   };
  // }
  // // set the connection options
  // const opts = {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   connectTimeoutMS: 10000,
  // };

  // // Connect to cluster
  // const client = new MongoClient(DATABASE_URL as string, opts);
  // await client.connect();
  // const db = client.db(DATABASE_NAME);
  // console.log("connected to database");
  // // set cache
  // cachedClient = client;
  // cachedDb = db;
  // console.log("cached connection instance");

  // return {
  //   dbClient: cachedClient,
  //   db: cachedDb,
  // };

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000,
  };

  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(DATABASE_URL, options);

    // Connect to cluster
    const client = await global.mongo.client.connect();
    await client.connect();
    const db = client.db(DATABASE_NAME);
    console.log("connected to database");

    return { db, dbClient: client };
  }
  const db: Db = global.mongo.client.db(DATABASE_NAME);
  return { db, dbClient: global.mongo.client.connect() };
}
