import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { likeTroll, unlikeTroll } from "../redux/actions/dataActions";
import MyButton from "../util/MyButton";
import DeleteTroll from "./DeleteTroll";
import {
  Chat as ChatIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder,
} from "@material-ui/icons";

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
  likedTroll = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.trollId === this.props.troll.trollId
      )
    )
      return true;

    return false;
  };

  handleLikeTroll = () => {
    this.props.likeTroll(this.props.troll.trollId);
  };

  handleUnlikeToll = () => {
    this.props.unlikeTroll(this.props.troll.trollId);
  };

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

    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedTroll() ? (
      <MyButton tip="Undo like" onClick={this.handleUnlikeToll}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.handleLikeTroll}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );

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
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{troll}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  likeTroll,
  unlikeTroll,
};

Troll.propTypes = {
  likeTroll: PropTypes.func.isRequired,
  unlikeTroll: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  troll: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Troll));
