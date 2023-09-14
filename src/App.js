import { useState } from "react";
import './App.css';
import MainBar from './MainBar';
import {
  NativeSelect,
} from '@mui/material';

import '@aws-amplify/ui-react/styles.css';

function App() {
  const prompts = {
    "Blog": "This is a blog.",
    "Press Release": "This is a press release.",
    "VC Pitch": "This is a VC Pitch."
  }

  const [questionInput, setquestionInput] = useState("");
  const [iterations, setIterations] = useState([]);
  const [outputType, setOutputType] = useState("blog");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    iterations.push(questionInput);
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
      console.log(event);
      alert(error.message);
    }
  }

  return (
    <>
    <div>
      <main className="main">
        <MainBar />
        <ul>
        {iterations.map(iteration => (
          <li>{iteration}</li>
        ))}
        </ul>
        <form onSubmit={onSubmit}>
          <NativeSelect name="outputType" value="Blog" onChange={(e) => setOutputType(prompts[e.target.value]) }>
            <option value="Blog">Blog</option>
            <option value="Press Release">Press Release</option>
            <option value="VC Pitch">VC Pitch</option>
          </NativeSelect>
          <input
            type="text"
            name="question"
            placeholder="What do you want to write about?"
            value={questionInput}
            onChange={(e) => setquestionInput(e.target.value)}
          />
          <input type="submit" value="Create!" />
        </form>
        <textarea name="currentVersion" value={result}></textarea>
      </main>
    </div>
    </>
  );
}

export default App;
