import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MyButton from "../util/MyButton";
import { postTroll } from "../redux/actions/dataActions";
import {
  Button,
  Dialog,
  DialogTitle,
  CircularProgress,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { Add as AddIcon, Close as CloseIcon } from "@material-ui/icons";

const styles = theme => ({
  ...theme.forms,
  icons: {
    color: "#fff",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
  submitButton: {
    position: "relative",
    marginTop: "10px",
  },
  progressSpiner: {
    position: "absolute",
  },
});

class PostTroll extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };

  componentWillReceiveProps(nextProp) {
    if (nextProp.ui.errors) this.setState({ errors: nextProp.ui.errors });
    if (!nextProp.ui.errors && !nextProp.ui.loading) this.handleClose();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, body: "", errors: {} });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.body);
    this.props.postTroll({ troll: this.state.body });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      classes,
      ui: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <>
        <MyButton tip="Post troll" onClick={this.handleOpen}>
          <AddIcon className={classes.icons} />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new troll</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Troll"
                multiline
                rows="3"
                placeholder="Feed the troll"
                error={errors.troll ? true : false}
                helperText={errors.troll}
                className={classes.TextField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpiner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = {
  postTroll,
};

PostTroll.propTypes = {
  postTroll: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostTroll));
