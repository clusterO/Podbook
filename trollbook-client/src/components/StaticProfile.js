import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Link as MuiLink, Paper, Typography } from "@material-ui/core";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
} from "@material-ui/icons";

const styles = theme => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-detail": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
  },
});

class StaticProfile extends Component {
  render() {
    const {
      classes,
      profile: { handle, createdAt, imageUrl, bio, website, location },
    } = this.props;
    return (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
          </div>
          <hr />
          <div className="profile-detail">
            <MuiLink
              component={Link}
              to={`/user/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color="primary" /> <span>{location}</span>
              </>
            )}
            <hr />
            {website && (
              <>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
              </>
            )}
            <hr />
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")} </span>
          </div>
        </div>
      </Paper>
    );
  }
}

StaticProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
