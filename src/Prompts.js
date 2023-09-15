import { useState } from "react";
import MainBar from './MainBar';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { API } from 'aws-amplify';
import { createPrompt } from './graphql/mutations';
import { listPrompts } from './graphql/queries';

import './App.css'; 
import { 
    Typography, 
    Button,
} from '@mui/material';

export default function Prompts() {
    const [promptName, setPromptName] = useState("");
    const [promptText, setPromptText] = useState("");
    const [promptList, setPrompts] = useState([]);

    try {
        API.graphql({
            query: listPrompts,
        }).then( res => {
            console.log(res.data.listPrompts.items);
            setPrompts(res.data.listPrompts.items);
            console.log('Got prompts!');
        });

    } catch (err) {
        console.log({ err });
    }

    function addPrompt() {
        const prompt = {
            name: promptName, 
            text: promptText,
        }
        try {
            API.graphql({
                query: createPrompt,
                variables: {
                    input: prompt
                }
            }).then( res => {
                console.log(res);
                console.log('New prompt created!');
            });

        } catch (err) {
            console.log({ err });
        }

        promptList.push( prompt );
        setPrompts(promptList);
        setPromptName(promptName);
        console.log(promptList);
    }

    return (
        <>
        <MainBar />
        <main>
            {promptList.map(prompt => {
                return(<Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>{prompt.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {prompt.text}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )
            })}
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <form>
                <Grid container xs={12}>
                    <Grid item xs={6}>
                    <input
                        className="promptName"
                        type="text"
                        name="promptName"
                        placeholder="Enter your prompt name here"
                        value={promptName}
                        onChange={(e) => setPromptName(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={8}>
                    <input
                        className="promptText"
                        type="text"
                        name="promptText"
                        placeholder="Enter your prompt text here"
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={2}>
                    <Button onClick={addPrompt} variant="contained">
                        <Typography>Save</Typography>
                    </Button>
                    </Grid>
                </Grid>
                </form>
            </Grid>
        </Grid>
        </main>
        </>
    )
}