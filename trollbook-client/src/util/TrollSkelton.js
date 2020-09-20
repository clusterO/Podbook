import React, { Component } from "react";
import NoImg from "../assets/images/noimage.png";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent } from "@material-ui/core";

const styles = theme => ({
  ...theme.styles,
});

class TrollSkelton extends Component {
  render() {
    const { classes } = this.props;
    const content = Array.from({ length: 3 }).map((item, index) => {
      return (
        <Card className={classes.card} key={index}>
          <CardMedia className={classes.cover} image={NoImg} />
          <CardContent className={classes.cardContent}>
            <div className={classes.handle} />
            <div className={classes.date} />
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
            <div className={classes.halfLine} />
          </CardContent>
        </Card>
      );
    });

    return <>{content}</>;
  }
}

TrollSkelton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrollSkelton);
