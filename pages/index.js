import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const prompts = {
    "Blog": "This is a blog.",
    "Press Release": "This is a press release.",
    "VC Pitch": "This is a VC Pitch."
  }

  const [questionInput, setquestionInput] = useState("");
  const [outputType, setOutputType] = useState("blog");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: outputType + questionInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      
      setResult(data.result);
      setquestionInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <main className={styles.main}>
        <form onSubmit={onSubmit}>
          <select name="outputType" value="Blog" onChange={(e) => setOutputType(prompts[e.target.value])}>
            <option value="Blog">Blog</option>
            <option value="Press Release">Press Release</option>
            <option value="VC Pitch">VC Pitch</option>
          </select>
          <input
            type="text"
            name="question"
            placeholder="Ask about ClearCogs"
            value={questionInput}
            onChange={(e) => setquestionInput(e.target.value)}
          />
          <input type="submit" value="Create!" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
