import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import DeleteTroll from "./DeleteTroll";
import TrollDialog from "./TrollDialog";
import LikeButton from "./LikeButton";
import { Chat as ChatIcon } from "@material-ui/icons";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

class Troll extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      troll: {
        userImage,
        troll,
        createdAt,
        userHandle,
        trollId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteTroll trollId={trollId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="Profile image"
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/user/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{troll}</Typography>
          <LikeButton trollId={trollId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
          <TrollDialog trollId={trollId} userHandle={userHandle} />
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

Troll.propTypes = {
  user: PropTypes.object.isRequired,
  troll: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Troll));
