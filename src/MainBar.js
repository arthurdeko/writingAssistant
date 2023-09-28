import './App.css';
import BasicMenu from './BasicMenu';
import {
    AppBar,
    Typography,
    Toolbar,
  } from '@mui/material';

function MainBar(props) {
    return (
        <>
        <AppBar position="static" className="align-right">
        <Toolbar variant="dense">
            <BasicMenu signOut={props.signOut} />
            <div className="spacer"></div>
            <Typography variant="h6" color="inherit" component="div">
            TextTune
            </Typography>
        </Toolbar>
        </AppBar>
        </>
    );
}

export default MainBar;