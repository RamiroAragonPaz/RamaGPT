
import { useState } from "react";


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
  
});
console.log(configuration);

    const question= async (prompt)=> {

    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 2000,
        temperature: 0,
    })
        .then((responseAnswer)=> {
        console.log(responseAnswer.data.choices[0].text);
        let chatgpt = (responseAnswer.data.choices[0].text)
        console.log("ChatGPT answer: ", chatgpt);
        return responseAnswer.data.choices[0].text;
        })
    return response
}

export default question;