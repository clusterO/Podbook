import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MyButton from "../util/MyButton";
import { deleteTroll } from "../redux/actions/dataActions";
import { Button, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
};

class DeleteTroll extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDeleteTroll = () => {
    this.props.deleteTroll(this.props.trollId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <MyButton
          tip="Delete troll"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete this troll</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDeleteTroll} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  deleteTroll,
};

DeleteTroll.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteTroll: PropTypes.func.isRequired,
  trollId: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DeleteTroll));
