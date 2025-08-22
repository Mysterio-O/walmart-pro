'use server'

import dbConnect, { collectionNames } from "@/lib/dbConnect"

export const registerUser = async (userData)=>{
    console.log('userdata from registerUser action',userData);
    console.log('collection names',collectionNames);
    const result = await dbConnect(collectionNames.USER).insertOne(userData);
    return result;
}