import jwt from  "jsonwebtoken";
import useDB from './db'

// Generate JWT
export const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const protect = async (token) => {
  const { db } = await useDB();

  if (
    token
  ) {
    // Get token from header
    token.split(" ")[1];
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    const isUser = await db.collection('users').findOne({_id: decoded.id});

    if (isUser) {
      return true;
    } else return false;
  } else {
    return true;
  }
};
