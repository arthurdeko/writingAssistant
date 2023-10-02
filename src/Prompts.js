import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { API, graphqlOperation } from 'aws-amplify';
import { createPrompt } from './graphql/mutations';
import * as mutations from './graphql/mutations';
import { listPrompts } from './graphql/queries';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import {
    TextField,
  } from '@mui/material';

import './App.css'; 
import { 
    Typography, 
    Button,
    IconButton,
} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary
  }));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 670,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Prompts(props) {
    const [promptName, setPromptName] = useState("");
    const [promptText, setPromptText] = useState("");
    const [promptList, setPrompts] = useState([]);
    const [selectedPromptName, setSelectedPromptName] = useState("");
    const [selectedPromptText, setSelectedPromptText] = useState("");
    const [selectedPromptId, setSelectedPromptId] = useState("");
    const [selectedPromptOwner, setSelectedPromptOwner] = useState("");
    const [promptToDelete, setPromptToDelete ] = useState("");
    const [showModal, setShowModal] = useState(false);

    function loadPrompts() {
            try {
                API.graphql(graphqlOperation(listPrompts,{
                    filter: {owner: {eq: props.user.username}}
                })).then( res => {
                    console.log(res.data.listPrompts.items);
                    setPrompts(res.data.listPrompts.items);
                    console.log('Got prompts!');
                });
        
            } catch (error) {
                console.log({ error });
            }
    }

    function addPrompt(event) {
        event.preventDefault();
        const prompt = {
            name: promptName, 
            text: promptText,
            owner: props.user.username
        }
        try {
            API.graphql({
                query: createPrompt,
                variables: {
                    input: prompt
                }
            }).then( res => {
                setPromptName("");
                setPromptText("");
                loadPrompts();
            });

        } catch (err) {
            console.log({ err });
        }
    }

    function deletePrompt(event) {
        event.preventDefault();
        let promptId = "";
        if ( event.target.parentElement.parentElement.value ) {
            promptId = event.target.parentElement.parentElement.value;
        } else if (event.target.parentElement.value) {
            promptId = event.target.parentElement.value;
        }
        if (!promptId) {
            console.log(event);
            alert('No ID provided!');
            return;
        }
        console.log(promptId);
        API.graphql({
            query: mutations.deletePrompt,
            variables: {
                input: {
                    id: promptId,
                }
            }
        }).then( res => {
            loadPrompts();
        }).catch( res => {
            alert(JSON.stringify(res.errors[0].message));
        });
    
    }

    function displayEdit(event) {
        console.log(event.target.parentElement.parentElement.value);
        console.log(event.target.parentElement.value);
        let promptName = "";
        if ( event.target.parentElement.parentElement.value ) {
            promptName = event.target.parentElement.parentElement.value;
        } else if (event.target.parentElement.value) {
            promptName = event.target.parentElement.value;
        }
        event.preventDefault();
        const p = promptList.find(item => { return item.id == event.target.parentElement.parentElement.value })
        if (p) {
            setSelectedPromptName(p.name);
            setSelectedPromptText(p.text);
            setSelectedPromptId(p.id);
            setSelectedPromptOwner(p.owner);
            setShowModal(true);    
        }
        return;
    }

    function updatePrompt(event) {
        event.preventDefault();
        try{
            API.graphql({
                query: mutations.updatePrompt,
                variables: {
                    input: {
                        name: selectedPromptName,
                        text: selectedPromptText,
                        id: selectedPromptId,
                        owner: selectedPromptOwner
                    }
                }
            }).then( res => {
                console.log(res);
                console.log('Prompt updated!');
                setSelectedPromptName("");
                setSelectedPromptText("");
                setSelectedPromptId("");
                setSelectedPromptOwner("");
                loadPrompts();
                setShowModal(false);
            });
    
        } catch(error) {
            console.error({ error });
        }
    }

    useEffect(() => {
        loadPrompts();
    }, []);

    return (
        <>
            <Modal
                open={showModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Grid container>
                <Box sx={style}>
                <form>
                    <Grid item>
                    <input
                        className="promptName"
                        type="text"
                        name="promptName"
                        placeholder="Enter your prompt name here"
                        value={selectedPromptName}
                        onChange={(e) => setSelectedPromptName(e.target.value)}
                    />
                    </Grid>
                    <Grid>
                    <TextField
                        multiline
                        className="promptText"
                        type="text"
                        name="promptText"
                        placeholder="Enter your prompt text here"
                        value={selectedPromptText}
                        onChange={(e) => setSelectedPromptText(e.target.value)}
                    />
                    </Grid>
                    <Grid container>
                        <Grid item xs={2}>
                        <Button value={selectedPromptName} onClick={updatePrompt} variant="contained">
                            <Typography>update</Typography>
                        </Button>
                        </Grid>
                        <Grid item xs={2}>
                        <Button value={selectedPromptName} onClick={deletePrompt} variant="contained">
                            <Typography>delete</Typography>
                        </Button>
                        </Grid>
                        <Grid item xs={2}>
                        <Button onClick={() => {setShowModal(false)}} variant="contained">
                            <Typography>cancel</Typography>
                        </Button>
                        </Grid>
                    </Grid>
                </form>
                </Box>
                </Grid>
            </Modal>
            <Grid item>
                <Stack spacing={1}>
                {promptList.map(prompt => {
                    return(<Item key={prompt.name}>
                        {prompt.name}
                        <IconButton
                            className="editButton"
                            value={prompt.id}
                            onClick={deletePrompt}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <IconButton
                            className="editButton"
                            value={prompt.id}
                            onClick={displayEdit}
                        >
                            <EditIcon />
                        </IconButton>
                    </Item>
                )
                })}
            </Stack>
            </Grid>
            <Grid item xs={12}>
                <form>
                <Grid container>
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
                    <Grid item xs={10}>
                    <TextField
                        multiline
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
                        <Typography>Add</Typography>
                    </Button>
                    </Grid>
                </Grid>
                </form>
            </Grid>
        </>
    )
}