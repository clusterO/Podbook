import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Troll from "../components/Troll";
import Profile from "../components/Profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTrolls } from "../redux/actions/dataActions";
import TrollSkelton from "../util/TrollSkelton";

class Home extends Component {
  componentDidMount() {
    this.props.getTrolls();
  }

  render() {
    const { trolls, loading } = this.props.data;
    const trollsMarkUp = !loading ? (
      trolls.map(troll => <Troll key={troll.trollId} troll={troll} />)
    ) : (
      <TrollSkelton />
    );
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {trollsMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
});

const mapDispatchToProps = {
  getTrolls,
};

Home.propTypes = {
  getTrolls: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
