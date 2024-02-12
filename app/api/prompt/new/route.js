import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => { //can remove 'res' if unused
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB(); //we need to connect everytime because this is a lambda function
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt, {status: 201}))
    } catch (error){
        return new Response("Failed to create a new prompt", {status: 500})
    }

}