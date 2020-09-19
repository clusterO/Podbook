import React, { Component } from "react";
import { Favorite as FavoriteIcon, FavoriteBorder } from "@material-ui/icons";
import MyButton from "../util/MyButton";
import { Link } from "react-router-dom";
import { likeTroll, unlikeTroll } from "../redux/actions/dataActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class LikeButton extends Component {
  likedTroll = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.trollId === this.props.trollId)
    )
      return true;

    return false;
  };

  handleLikeTroll = () => {
    this.props.likeTroll(this.props.trollId);
  };

  handleUnlikeToll = () => {
    this.props.unlikeTroll(this.props.trollId);
  };

  render() {
    const {
      user: { authenticated },
    } = this.props;

    const likeButton = !authenticated ? (
      <Link to="login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedTroll() ? (
      <MyButton tip="Undo like" onClick={this.handleUnlikeToll}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.handleLikeTroll}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );

    return likeButton;
  }
}

const mapDispatchToProps = {
  likeTroll,
  unlikeTroll,
};

const mapStateToProps = state => ({
  user: state.user,
});

LikeButton.propTypes = {
  likeTroll: PropTypes.func.isRequired,
  unlikeTroll: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  trollId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
