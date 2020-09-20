import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Troll from "../components/Troll";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import StaticProfile from "../components/StaticProfile";

class User extends Component {
  state = {
    profile: null,
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(result => {
        this.setState({ profile: result.data.user });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { trolls, loading } = this.props.data;

    const trollsMarkUp = loading ? (
      <p>Loading data...</p>
    ) : trolls === null ? (
      <p>No trolls from this user</p>
    ) : (
      trolls.map(troll => <Troll key={troll.trollId} troll={troll} />)
    );

    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {trollsMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p>Loading profile...</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
});

const mapDispatchToProps = {
  getUserData,
};

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);