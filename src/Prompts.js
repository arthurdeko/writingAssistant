import { useState } from "react";
import MainBar from './MainBar';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import './App.css'; 
import { 
    Typography, 
    Button,
} from '@mui/material';

export default function Prompts() {
    const [promptName, setPromptName] = useState("");
    const [promptText, setPromptText] = useState("");
    
    function addPrompt() {
        promptList.push(
            {
                name: promptName, 
                text: promptText,
            }
        )
        setPrompts(promptList);
        setPromptName(promptName);
        console.log(promptList);
    }

    const prompts = [
        {
            "name": "Blog",
            "text": "Write me a blog post"
        },
        {
            "name": "VC pitch",
            "text": "Write me a VC pitch"
        },
        {
            "name": "Press Release",
            "text": "Write me a Press Release"
        },
    ]

    const [promptList, setPrompts] = useState(prompts);

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