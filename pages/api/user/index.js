import bcrypt from "bcryptjs";
import { protect } from "../utils";
import useDB from '../db';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;


export default async function handler(req, res) {
  const { db } = await useDB();
  if (!protect(req.headers.authorization)) {
    return res
      .status(503)
      .json({ message: "Unauthorized user", unauthorized: true });
  }

  if (req.method === "PUT") {
    const { password, confirmPass, id, oldPass, amenities } = req.body;

    if (password !== confirmPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
      // find user
      const existingUser = await db.collection('users').findOne({ _id: ObjectId(id) });
      if (!existingUser) {
        return res.status(400).json({ message: "User does not exists" });
      }


      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // update new user
      const updateUser = {
        password: hashedPassword,
        amenities,
        fullName: 'Fareed Murad 1'
      }

      await db.collection('users').updateOne({ _id: ObjectId(id) }, { $set: { ...updateUser } });
      const user = await db.collection('users').findOne({ _id: ObjectId(id) });

      res.status(200).json({
        message: "User update successful",
        code: 200,
        user: {
          oldPass: oldPass,
          id: user?._id,
          fullName: user?.fullName,
          email: user?.email,
          country: user?.country,
          amenities: amenities
        },
      });
    } catch (err) {
      console.error("Failed to update user:", err);
      res.status(500).json({ message: "Failed to update user" });
    }
  } else {
    res.status(400).json({ message: "Invalid request method" });
  }
}
