import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
    
        async signIn({ profile }) {
            try {
                //every NextJS route is a serverless route, meaning:
                //it is a Lambda function that opens up only when it is called
                //and everytime it gets called it needs to spin up the server and make a connection to the server(which is great because we don't have to keep our server running constantly, but we do have to make a connection to the database)
    
                await connectToDB();
    
                // check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });
    
                // if not, create a new user
                if(!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
    
                return true;
    
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
    
})

export { handler as GET, handler as POST };