import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import MyButton from "../util/MyButton";

const styles = theme => ({
  ...theme.forms,
  button: {
    float: "right",
  },
});

class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false,
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.mapDetailsToState(credentials);
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.mapDetailsToState(this.props.credentials);
  };

  mapDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const usereDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };

    this.props.editUserDetails(usereDetails);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <MyButton
          tip="Edit details"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Your location"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = state => ({
  credentials: state.user.credentials,
});

const mapDispatchToProps = {
  editUserDetails,
};

EditDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditDetails));
