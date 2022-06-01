import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { WelcomePage } from "./WelcomePage";
import { TodoItemsPage } from "../pages/TodoItemsPage";
import TopNav from './TopNav';
import { RealmAppProvider, useRealmApp } from "./RealmApp";
import { ThemeProvider } from "./Theme";
import { AppName } from "./AppName";
import { appId } from "../realm.json";
import "./App.css";
import * as Realm from 'realm-web';
import React from 'react';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {BrowserRouter,Route,Routes, Link} from "react-router-dom";
import Insights from '../pages/Insights';
import Home from "../pages/Home";
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Links from '@mui/material/Link';
import AnimatedRoutes from "./AnimatedRoutes";

const app = new Realm.App({id: "application-0-daeqg"});
export default function AppWithRealm() {
  return (
    <ThemeProvider>
      <RealmAppProvider appId={appId}>
        <App />
      </RealmAppProvider>
    </ThemeProvider>
  );
}

// Create a component that displays the given user's details
function UserDetail({ user }) {
  return (
    <div>
      <h1>Logged in with anonymous id: {user.id}</h1>
    </div>
  );
}
// Create a component that lets an anonymous user log in
function Login({ setUser }) {
  const loginAnonymous = async () => {
    const user = await app.logIn(Realm.Credentials.anonymous());
    setUser(user);
  };
  return <button onClick={loginAnonymous}>Log In</button>;
}

function App() {
  const { currentUser, logOut } = useRealmApp();
  return (
    <div className="App">
      <AppBar position="sticky">
        <Toolbar>
          <AppName />
          {currentUser ? (
          <>
            {/* <TopNav/> */}
            <Button
              variant="contained"
              color="secondary"
              onClick={async () => {
                await logOut();
              }}
            >
              <Typography variant="button">Log Out</Typography>
            </Button>
          </> 
          ) : null}
        </Toolbar>
      </AppBar>
      {currentUser ? 
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
      : <WelcomePage />}
    </div>
  );
}
// const App = () => {
//   // Keep the logged in Realm user in local state. This lets the app re-render
//   // whenever the current user changes (e.g. logs in or logs out).
//   const [user, setUser] = React.useState(app.currentUser);
//   // If a user is logged in, show their details.
//   // Otherwise, show the login screen.
//   return (
//     <div className="App">
//       <div className="App-header">
//         {user ? <UserDetail user={user} /> : <Login setUser={setUser} />}
//       </div>
//     </div>
//   );
// };