import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { WelcomePage } from "./WelcomePage";
import { TodoItemsPage } from "./TodoItemsPage";
import { RealmAppProvider, useRealmApp } from "./RealmApp";
import { ThemeProvider } from "./Theme";
import { AppName } from "./AppName";
import { appId } from "../realm.json";
import "./App.css";
import * as Realm from 'realm-web';
import React from 'react';

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
            <Button
              variant="contained"
              color="secondary"
              onClick={async () => {
                await logOut();
              }}
            >
              <Typography variant="button">Log Out</Typography>
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      {currentUser ? <TodoItemsPage /> : <WelcomePage />}
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