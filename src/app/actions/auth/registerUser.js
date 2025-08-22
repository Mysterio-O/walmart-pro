'use server'

import dbConnect, { collectionNames } from "@/lib/dbConnect"
import bcrypt from 'bcrypt';

export const registerUser = async (userData) => {
    console.log('userdata from registerUser action', userData);
    console.log('collection names', collectionNames);

    const database = await dbConnect(collectionNames.USER);

    const existingUser = await database.findOne({ email: userData?.email });
    if (existingUser) {
        console.log('User already exists');
        return { error: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    userData.password = hashedPassword;
    userData.createdAt = new Date();

    const result = await database.insertOne(userData);
    return result;
}