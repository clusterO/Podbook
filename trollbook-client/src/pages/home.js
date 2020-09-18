import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Troll from "../components/Troll";
import Profile from "../components/Profile";
import axios from "axios";

export default class Home extends Component {
  state = {
    trolls: null,
  };

  componentDidMount() {
    axios
      .get("/trolls")
      .then(result => {
        this.setState({ trolls: result.data });
      })
      .catch(err => console.error(err));
  }

  render() {
    const trollsMarkUp = this.state.trolls ? (
      this.state.trolls.map(troll => (
        <Troll key={troll.trollId} troll={troll} />
      ))
    ) : (
      <p>Loadin ...</p>
    );
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {trollsMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
