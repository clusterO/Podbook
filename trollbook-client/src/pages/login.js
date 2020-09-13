import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import AppIcon from "../assets/images/troll.ico";
import axios from "axios";

const styles = theme => ({
  ...theme.forms,
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      loading: true,
    });

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("/login", userData)
      .then(result => {
        localStorage.setItem("FBIdToken", `Bearer ${result.data.token}`);
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="troll" className={classes.image} />
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={20} className={classes.progress} />
              )}
            </Button>
          </form>
          <small>
            don't have an account? sign up <Link to="/signup">here</Link>
          </small>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
