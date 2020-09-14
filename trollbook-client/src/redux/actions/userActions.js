import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";
import axios from "axios";

export const userLogin = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(result => {
      const FBIdToken = `Bearer ${result.data.token}`;
      localStorage.setItem("FBIdToken", FBIdToken);
      axios.default.headers.common["Authorization"] = FBIdToken;
      this.setState({
        loading: false,
      });
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_USER,
        payload: err.response.data,
      });
    });
};

export const getUserData = () => dispatch => {
  axios
    .get("/user")
    .then(result => {
      dispatch({
        type: SET_USER,
        payload: result.data,
      });
    })
    .catch(err => {
      console.error(err);
    });
};
