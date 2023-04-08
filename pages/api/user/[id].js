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
    const { id } = req.query;

    if (req.method === "GET") {
        const user = await db.collection('users').findOne({ _id: ObjectId(id) });
        return res.status(200).json(user);
    }

    if (req.method === "DELETE") {

        try {
            console.log(id)
            await db.collection('users').deleteOne({ _id: ObjectId(id) });
            res.status(200).json({
                message: "User has been deleted!",
                code: 200,
            });
        } catch (err) {
            console.error("Failed to delete user:", err);
            res.status(500).json({ message: "Failed to delete user" });
        }
    } else {
        res.status(400).json({ message: "Invalid request method" });
    }
}
