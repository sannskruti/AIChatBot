//Initialise the chat gpt api, and then we are going to prompt a user for a message
// and continue the conversation untill the user ends the file

import OpenAI from "openai";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

//Step 1 - Initialise chatgpt api
const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY;
// const configuartion= new Configuration({
//     apikey:OPENAI_SECRETKEY
// })
const openai = new OpenAI({
  apiKey: OPENAI_SECRET_KEY,
});
//Step 2 - create context for the api (give some personality)
const context =
  "You are a hilarious friendly person who I identfy as samosa and has unnatuaral obsession with samosa. You name is sans";
const model = "gpt-3.5-turbo";
let messages = [
  {
    role: "user",
    content: "tell me about yourself",
  },
];
//Step 3 - define the function to retrieve the api based on user input
async function sendPrompt(input) {
  const current_messages = [
    {
      role: "system",
      content: context,
    },
    ...messages,
  ];
  const completion = await openai.chat.completions.create({
    model,
    messages: current_messages,
  });
  console.log(completion.choices[0].messages.content);
}
//Step 4- create a run function that requests a user input
async function run() {
  await sendPrompt();
}
run();
