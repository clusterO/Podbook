import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Toolbar, Button, AppBar } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Home as HomeIcon, Notifications } from "@material-ui/icons";
import MyButton from "../util/MyButton";
import { withStyles } from "@material-ui/core/styles";
import PostTroll from "./PostTroll";

const styles = theme => ({
  ...theme.forms,
  icons: {
    color: "#fff",
  },
});

class Navbar extends Component {
  render() {
    const { classes, authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <>
              <PostTroll />
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon className={classes.icons} />
                </MyButton>
              </Link>
              <MyButton tip="Notifications">
                <Notifications className={classes.icons} />
              </MyButton>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
