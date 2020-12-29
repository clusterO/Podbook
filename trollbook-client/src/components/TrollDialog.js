import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MyButton from "../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import {
  Close as CloseIcon,
  UnfoldMore,
  Chat as ChatIcon,
} from "@material-ui/icons";
import { connect } from "react-redux";
import { getTroll, clearErrors } from "../redux/actions/dataActions";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const styles = (theme) => ({
  ...theme.styles,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: "4%",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

class TrollDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };

  componentDidMount() {
    if (this.props.openDialog) this.handleOpen();
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, trollId } = this.props;
    const newPath = `/user/${userHandle}/troll/${trollId}`;

    if (oldPath === newPath) oldPath = `/user/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getTroll(this.props.trollId);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      troll: {
        trollId,
        troll,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      ui: { loading },
    } = this.props;

    const dialogMarkUp = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={120} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            to={`/user/${userHandle}`}
            color="primary"
            variant="h5"
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{troll}</Typography>
          <LikeButton trollId={trollId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm trollId={trollId} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand post"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            onClick={this.handleClose}
            tip="Close"
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkUp}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  troll: state.data.troll,
  ui: state.ui,
});

const mapDispatchToProps = {
  getTroll,
  clearErrors,
};

TrollDialog.propTypes = {
  getTroll: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  trollId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  troll: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TrollDialog));
