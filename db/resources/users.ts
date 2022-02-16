import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { connectToDB } from "../connect";

export const getUser = async ({ email }) => {
  const { db } = await connectToDB();
  const user = await db.collection("users").findOne({ email });
  return user;
};

export const getUserById = async (id: string) => {
  const { db } = await connectToDB();
  const user = await db
    .collection("users")
    .findOne({ _id: id }, { projection: { password: 0 } });
  return user;
};

export const getUsers = async () => {
  const { db } = await connectToDB();
  const users = await db
    .collection("users")
    .find({}, { projection: { password: 0 } })
    .toArray();
  return users;
};

export const getOtherUsers = async (id: string) => {
  const { db } = await connectToDB();
  const users = await db
    .collection("users")
    .find({ _id: { $ne: id } }, { projection: { password: 0 } })
    .toArray();
  return users;
};

export const createUser = async (user: any) => {
  const { db } = await connectToDB();
  const { password, ...rest } = user;
  const salt = bcrypt.genSaltSync();

  const operation = await db.collection("users").insertOne({
    _id: nanoid(12),
    ...rest,
    password: bcrypt.hashSync(password, salt),
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  });

  return operation;
};
