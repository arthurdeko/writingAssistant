import awsconfig from './aws-exports';
import { Amplify } from 'aws-amplify';
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import Grid from '@mui/material/Grid';
import Home from './Home';
import Prompts from './Prompts';
import {
    Route,
    Routes,
} from 'react-router-dom';
import MainBar from './MainBar';

Amplify.configure(awsconfig);

function App() {
    return (
        <>
        <Authenticator>
        {({ signOut, user }) => (
            <Grid container spacing={2} padding={2}>
            <MainBar signOut={signOut} />
            <Routes>
            <Route path="/home" element={<Home user={user} signOut={signOut} />} />
            <Route path="/prompts" element={<Prompts user={user} signOut={signOut} />} />
            </Routes>
            </Grid>
        )}

        </Authenticator>

        </>
    );
}

export default withAuthenticator(App);