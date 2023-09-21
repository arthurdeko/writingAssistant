import { useState, useEffect, React } from "react";
import './App.css';
import MainBar from './MainBar';
import {
  TextField,
} from '@mui/material';
import '@aws-amplify/ui-react/styles.css';
import { API } from 'aws-amplify';
import { listPrompts } from './graphql/queries';
import MultipleSelect from "./MultipleSelect";

function App() {
  const [promptList, setPrompts] = useState([]);
  useEffect(() => {
    async function getPrompts() {
      const prompts = await API.graphql({
          query: listPrompts,
      });
      console.log(prompts.data.listPrompts.items);
      setPrompts(prompts.data.listPrompts.items);
    }
    getPrompts();
  }, []);

  const [questionInput, setquestionInput] = useState("");
  const [iterations, setIterations] = useState([]);
  const [result, setResult] = useState();

  return (
    <>
      <MainBar />
      <main>
        <ul>
        {iterations.map(iteration => (
          <li>{iteration}</li>
        ))}
        </ul>
          <MultipleSelect 
            label="Prompts" 
            items={promptList}
            setResult={setResult}
            question={questionInput}>
          </MultipleSelect>
          <TextField multiline
            type="text"
            name="question"
            fullWidth
            placeholder="What do you want to write about?"
            value={questionInput}
            onChange={(e) => setquestionInput(e.target.value)}
            rows={4}
          />
        <TextField
          className="completion"
          multiline 
          fullWidth
          name="currentVersion" 
          value={result}
          rows={10}
        />
      </main>
    </>
  );
}

export default App;
