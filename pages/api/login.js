import bcrypt from 'bcryptjs';
import { generateToken } from './utils';
import useDB from './db'
 
export default async function handler(req, res) {
  const { db } = await useDB();
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    // Check if user exists
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }

    // Check if password matches
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', code: 200, user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      country: user.country,
      token: generateToken(user),
      oldPass: password,
      amenities: user.amenities
    } });
  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }
}
