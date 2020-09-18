import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Link as MuiLink,
  Paper,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
  Edit as EditIcon,
  KeyboardReturn,
} from "@material-ui/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { uploadImage, userLogout } from "../redux/actions/userActions";
import EditDetails from "./EditDetails";

const styles = theme => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
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
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.imageInputRef = React.createRef();
  }

  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  handleEditImage = () => {
    this.imageInputRef.current.click();
  };

  handleLogout = () => {
    this.props.userLogout();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                hidden="hidden"
                ref={this.imageInputRef}
                onChange={this.handleImageChange}
              />
              <Tooltip title="Edit profile picture" placement="top">
                <IconButton onClick={this.handleEditImage} className="button">
                  <EditIcon color="secondary" />
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className="profile-detail">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
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
            <Tooltip title="Logout" placement="top">
              <IconButton onClick={this.handleLogout}>
                <KeyboardReturn color="secondary" />
              </IconButton>
            </Tooltip>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>loading...</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  uploadImage,
  userLogout,
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
