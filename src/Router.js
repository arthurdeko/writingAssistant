import Home from './Home';
import Prompts from './Prompts';
import ErrorPage from './ErrorPage';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

export default function Router(props) {
    const routes = createBrowserRouter([
            {
              path: "/home",
              element: <Home user={props.user} signOut={props.signOut}/>,
              errorElement: <ErrorPage />
            },
            {
              path: "/prompts",
              element: <Prompts user={props.user} signOut={props.signOut}/>,
              errorElement: <ErrorPage />
            }
          ], { basename: "/"});

    return (
        <>
        <RouterProvider routes={routes} />
        </>
    );
}