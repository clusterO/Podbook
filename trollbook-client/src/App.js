import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#e1bee7",
      main: "#9c27b0",
      dark: "#6a1b9a",
      contrastText: "#fff",
    },
    secondary: {
      light: "#d1c4e9",
      main: "#673ab7",
      dark: "#4527a0",
      contrastText: "#fff",
    },
  },
  forms: {
    form: {
      textAlign: "center",
    },
    image: {
      width: "50px",
      height: "50px",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    button: {
      margin: "20px auto 20px auto",
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
    },
  },
});

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}
