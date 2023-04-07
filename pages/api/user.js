import User from "../../models/user";
import { protect } from "./utils";
import useDB from './db';

export default async function handler(req, res) {
  const { db } = await useDB();
  if (!protect(req.headers.authorization)) {
    return res
      .status(503)
      .json({ message: "Unauthorized user", unauthorized: true });
  }

  if (req.method === "GET") {
    const { id } = req.params.id;
    const user = await db.collection('users').findOne({ id });
    return res.status(200).json(user);
  }

  if (req.method === "PUT") {
    const { password, confirmPass, id, oldPass, amenities } = req.body;

    if (password !== confirmPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
      // find user
      const existingUser = await db.collection('users').findOne({ id });
      if (!existingUser) {
        return res.status(400).json({ message: "User does not exists" });
      }


      // Create new user
      const updateUser = new User({
        password,
        ...amenities
      });

      await db.collection('users').updateOne({ _id: id }, {$set: updateUser});
      const user = await db.collection('users').findOne({ id });

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
