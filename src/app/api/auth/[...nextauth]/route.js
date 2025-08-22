import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import NextAuth from "next-auth"




const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }