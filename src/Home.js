import { React } from "react";
import './App.css';
import '@aws-amplify/ui-react/styles.css';

import MultipleSelect from "./MultipleSelect";

function Home(props) {
  return (
    <>
        <MultipleSelect user={props.user} />
    </>
  );
}

export default Home;
