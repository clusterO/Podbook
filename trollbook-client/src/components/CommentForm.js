import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { submitComment } from "../redux/actions/dataActions";

const styles = theme => ({
  ...theme.styles,
  grid: {
    textAlign: "center",
  },
});

class CommentForm extends Component {
  state = {
    body: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) this.setState({ errors: nextProps.ui.errors });
    if (!nextProps.ui.errors && !nextProps.ui.loading)
      this.setState({ body: "" });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitComment(this.props.trollId, { body: this.state.body });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;

    const commentFormMarkUp = authenticated ? (
      <Grid item sm={12} className={classes.grid}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Add comment"
            error={errors.comment ? true : false}
            helper={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.texxtField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    ) : null;

    return commentFormMarkUp;
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  authenticated: state.user.authenticated,
});

const mapDispatchToProps = {
  submitComment,
};

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  trollId: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CommentForm));
