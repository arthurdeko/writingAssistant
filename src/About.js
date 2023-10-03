import {
    Grid,
    Typography
} from '@mui/material'


function About() {
    return (
        <>
        <Grid container spacing={{ xs: 1, md: 2 }}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={11}>
            <Typography variant="h5">Purpose</Typography>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={11}>
            <Typography>
            TextTune is designed to help organizations create consistent and cohesive written content by providing a simple and efficient way to generate text. By utilizing prompts and collaborative editing, teams can improve the quality and style of their work.    
            </Typography>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={11}>
            <Typography variant="h5">
            Instructions    
            </Typography>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={11}>
            <Typography>
            1. Create prompts
            </Typography>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={11}>
            <Typography>
            - Click on the "Prompt" option in the menu.
            </Typography>
            <Typography>
            - Give your prompt a descriptive name.
            </Typography>
            <Typography>
            - Define the specific guidelines and parameters for the prompt, such as tone, vocabulary, and sentence structure.
            </Typography>
            <Typography>
            - Click the "Add" button.
            </Typography>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={11}>
            <Typography>
            2. Create content
            </Typography>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={10}>
            <Typography>
            - Click the "Compose" option in the menu.
            </Typography>
            <Typography>
            - Select the prompts you'd like to use.
            </Typography>
            <Typography>
            - Enter what you'd like to compose.
            </Typography>
            <Typography>
            - Click the "Create" button.
            </Typography>

            </Grid>
            </Grid>

        </Grid>
        </>
    )
}

export default About;