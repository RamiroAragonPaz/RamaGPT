import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import question from '@/components/chatgpt'
import { useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [answered, setAnswered] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getAnswer(prompt);
  };

  const getAnswer = async (a) => {
    setAnswered(true);
    setResponse(await question(a));
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



