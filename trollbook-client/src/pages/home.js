import React, { Component } from "react";
import { Grid } from "@material-ui/core";

export default class Home extends Component {
  render() {
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          <p>content ...</p>
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>content ...</p>
        </Grid>
      </Grid>
    );
  }
}
