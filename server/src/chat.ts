import OpenAI from "openai";

const key = process.env.OPENAI_SECRET;

const openai = new OpenAI({
    apiKey: key
})

const generateResponse = async (messages: any) => {
    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
}

export { generateResponse };