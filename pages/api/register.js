import bcrypt from "bcryptjs";
import User from "../../models/user";
import useDB from './db'

export default async function handler(req, res) {

  const { db } = await useDB();

  if (req.method === "POST") {
    const { fullName, email, password, confirmPass, country } = req.body;
    // const { db } = await connectDatabae();
    // Basic validation
    if (!fullName || !email || !password || !confirmPass || !country) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (password !== confirmPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
      // Check if user already exists
            // Check if user already exists
      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // Create new user
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        country,
      });

      const createdUser = await db.collection('users').insertOne(newUser);

      res.status(201).json({
        message: "Register successful",
        user: {
          id: createdUser._id,
          fullName: createdUser.fullName,
          email: createdUser.email,
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
