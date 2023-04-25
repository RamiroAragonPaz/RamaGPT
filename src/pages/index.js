import styles from '@/styles/Home.module.css'
import { useState } from 'react'


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.API_KEY,  
});

console.log(process.env.API_KEY)

export default function Home() {

  const [answered, setAnswered] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getAnswer(prompt);
  };

  const getAnswer = async (prompt) => {

  const openai = new OpenAIApi(configuration);
  await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2000,
      temperature: 0,
  })
      .then((responseAnswer)=> {
      console.log(responseAnswer.data.choices[0].text);
      let chatgpt = (responseAnswer.data.choices[0].text)
      setResponse(chatgpt);
      })
    setAnswered(true);
    setPrompt("");
  };









  return (
    <div className={styles.container}>
      <div className={styles['title-container']}>
        <h1 className={styles.title}>Welcome to</h1>
        <h1 className={styles.title}>RamaGPT</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label className={styles.labelX} htmlFor="prompt">Ask me anything:</label>
          <input
            type="text"
            id="prompt"
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className={styles['form-control']}
            placeholder="e.g. What's the meaning of life?"
            required
          />
        </div>
        <button type="submit" className={styles['btn-primary']}>
          Ask
        </button>
      </form>
      {answered && (
        <div className={styles.card+''+styles.mt-4}>
          <div className={styles['card-header']}>Answer:</div>
          <div className={styles['card-body']}>
            <p className={styles['card-text']}>{response}</p>
          </div>
        </div>
      )}
    </div>
  );
};



