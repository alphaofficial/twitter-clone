const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { nanoid } = require("nanoid");

const tweetsData = require("./tweetsData.js");

dotenv.config();

async function seedDB() {
  const uri = process.env.DATABASE_URL;
  const databaseName = process.env.DATABASE_NAME;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
  });
  const db = client.db(databaseName);

  try {
    await client.connect();
    console.log("Connected to database");

    // create user
    const salt = bcrypt.genSaltSync();
    const userCollection = db.collection("users");
    await userCollection.drop();
    const user = await userCollection
      .insertOne({
        _id: nanoid(12),
        firstname: "Albert",
        lastname: "King",
        username: "alphaxsalt",
        email: "alphaxsalt@gmail.com",
        password: bcrypt.hashSync("password", salt),
      })
      .then((result) => result);
    // create tweets
    if (user && user.acknowledged) {
      const tweetCollection = db.collection("tweets");
      await tweetCollection.drop();
      const tweets = tweetsData.reduce((acc, cur) => {
        cur.user = user.insertedId;
        acc.push(cur);
        return acc;
      }, []);
      await tweetCollection.insertMany(tweets);
    }

    console.log("Database seeded!");
    await client.close();
    console.log("Database disconnected!");
  } catch (err) {
    console.log(err);
  }
}

seedDB();
