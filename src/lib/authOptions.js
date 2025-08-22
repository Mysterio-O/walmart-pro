import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect, { collectionNames } from "./dbConnect";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcrypt';

export const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password", placeholder: "********" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const { email, password } = credentials;
                console.log(email, password, 'from authorize function');
                console.log(collectionNames.USER, 'from authorize function');
                const collectionName = collectionNames.USER;
                const existingUser = await dbConnect(collectionName).findOne({ email })
                console.log(existingUser, 'from authorize function');

                if (!existingUser) {
                    console.log('No user found with the given email');
                    return null
                }

                if (existingUser && existingUser.password) {
                    // Any object returned will be saved in `user` property of the JWT
                    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
                    if (isPasswordValid) {
                        return existingUser
                    }

                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile: async (profile, token) => {

            }
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            console.log(session, 'from callbacks session');
            if (session) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log(user, 'from callbacks jwt');
            if (user) {
                token.id = user?._id;
                token.email = user.email;
                token.name = user?.firstName + ' ' + user?.lastName;
            }
            return token
        }
    }
}