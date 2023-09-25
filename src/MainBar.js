import { useState } from "react";
import './App.css';
import awsconfig from './aws-exports';
import { Amplify } from 'aws-amplify';
import BasicMenu from './BasicMenu';
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import {
    AppBar,
    Typography,
    Toolbar,
  } from '@mui/material';

Amplify.configure(awsconfig);

function MainBar() {
    return (
        <>
        <Authenticator>
        {({ signOut, user }) => (
        <AppBar position="static" className="align-right">
        <Toolbar variant="dense">
            <BasicMenu signOut={signOut} />
            <div className="spacer"></div>
            <Typography variant="h6" color="inherit" component="div">
            TextTune
            </Typography>
        </Toolbar>
        </AppBar>
        )}
        </Authenticator>
        </>
    );
}

export default withAuthenticator(MainBar);