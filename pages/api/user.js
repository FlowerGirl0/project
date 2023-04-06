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
    const { password, confirmPass, id, oldPass } = req.body;

    // Basic validation
    if (!password || !confirmPass) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

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
      });

      await db.collection('users').updateOne({_id: id}, {$set:updateUser});

      res.status(201).json({
        message: "User update successful",
        user: {
          oldPass,
          password,
          id: existingUser._id,
          fullName: existingUser.fullName,
          email: existingUser.email,
          country: existingUser.country,
        },
      });
    } catch (err) {
      console.error("Failed to signup:", err);
      res.status(500).json({ message: "Failed to signup" });
    }
  } else {
    res.status(400).json({ message: "Invalid request method" });
  }
}
