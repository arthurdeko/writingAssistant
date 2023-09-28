import { useState, useEffect, React } from "react";
import FormControl from '@mui/material/FormControl';
import { API, graphqlOperation } from 'aws-amplify';
import { listPrompts } from './graphql/queries';
import axios from 'axios';
import { 
  TextField,
  Button,
  Grid,
  LinearProgress,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';

export default function MultipleSelect(props) {
  const [loading, setLoading ] = useState(false);
  const [promptList, setPrompts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [questionInput, setQuestionInput] = useState("");
  const [result, setResult] = useState();

  useEffect(() => {
    async function getPrompts() {
      API.graphql(graphqlOperation(listPrompts,{
        filter: {owner: {eq: props.user.username}}
      })).then( res => {
          console.log(res.data.listPrompts.items);
          setPrompts(res.data.listPrompts.items);
          setSelectedItems(res.data.listPrompts.items.map(item => { return item.name }))
          console.log(`Selected items in useEffect ${selectedItems}`);
      });
    }
    getPrompts();
  }, []);

  function composePrompt() {
    let composedPrompt = {
      prompt: "",
      question: questionInput,
    };
    for (const prompt of selectedItems) {
      if (promptList.find( item => {return item.name === prompt})) {
        composedPrompt.prompt += promptList.find( i => {return i.name === prompt}).text
      }
    }
    return composedPrompt;
  }

  function onSubmit(event) {
    const input = composePrompt();
    setLoading(true);
    event.preventDefault();
    axios.post('https://undndgmlrl.execute-api.us-east-1.amazonaws.com/dev/generate', JSON.stringify(input))
    .then(data => {
      setResult(data.data.choices[0].message.content);
      setLoading(false);
    })
  }

  function handleSwitch(event) {
    if (!selectedItems.length) {
      return;
    }
    if (event.target.checked) {
      selectedItems.push(event.target.name);
      return;
    }
    setSelectedItems(selectedItems.filter( item => {return item != event.target.name}));
  }

  return (
    <Grid item xs={8}>
      <FormGroup>
      {promptList.map(prompt => {
          return(<FormControlLabel 
            key={prompt.name} 
            control={<Switch name={prompt.name} defaultChecked onChange={handleSwitch}/>} 
            label={prompt.name} />)
      })}
      <FormControl>
        <Button type="submit" value="Create!" onClick={onSubmit} variant="outlined" >Create</Button>
      </FormControl>
      <Grid item xs={15}>
        <TextField multiline
          type="text"
          name="question"
          fullWidth
          placeholder="What do you want to write about?"
          onChange={(e) => setQuestionInput(e.target.value)}
          rows={4}
        />
      </Grid>
      <Grid item xs={15}>
        { loading ? <LinearProgress color="success" /> : null }
        <TextField
          className="completion"
          multiline 
          fullWidth
          name="currentVersion" 
          value={result}
          rows={10}
        />
      </Grid>
      </FormGroup>
    </Grid>
  );
}