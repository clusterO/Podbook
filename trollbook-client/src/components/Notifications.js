import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import { markNotificationRead } from "../redux/actions/userActions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Tooltip,
  Badge,
} from "@material-ui/core";
import {
  Notifications as NotificationsIcon,
  Favorite as FavoriteIcon,
  Chat as ChatIcon,
} from "@material-ui/icons";

const styles = theme => ({
  ...theme.styles,
  icons: {
    color: "#fff",
  },
  notificationIcon: {
    marginRight: 5,
  },
  notificationTypography: {
    color: "#000",
  },
});

class Notifications extends Component {
  state = {
    anchorEl: null,
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.target });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter(notification => !notification.read)
      .map(notification => notification.notificationId);

    this.props.markNotificationRead(unreadNotificationsIds);
  };

  render() {
    const { classes, notifications } = this.props;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter(notification => notification.read === false).length >
      0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                notifications.filter(
                  notification => notification.read === false
                ).length
              }
              color="secondary"
            >
              <NotificationsIcon className={classes.icons} />
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon className={classes.icons} />);
    } else {
      notificationsIcon = <NotificationsIcon className={classes.icons} />;
    }

    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map(notification => {
          const verb = notification.type === "like" ? "liked" : "commented on";
          const time = dayjs(notification.createdAt).fromNow();
          const iconColor = notification.read ? "primary" : "secondary";
          const icon =
            notification.type === "like" ? (
              <FavoriteIcon
                color={iconColor}
                className={classes.notificationIcon}
              />
            ) : (
              <ChatIcon
                color={iconColor}
                className={classes.notificationIcon}
              />
            );

          return (
            <MenuItem key={notification.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                to={`/user/${notification.recipient}/troll/${notification.trollId}`}
                variant="body1"
                className={classes.notificationTypography}
              >
                {notification.sender} {verb} your troll {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications
        </MenuItem>
      );

    return (
      <>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.handleMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.user.notifications,
});

const mapDispatchToProps = {
  markNotificationRead,
};

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
  markNotificationRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Notifications));
