import {
  SET_USER,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  SET_ERRORS,
  LOADING_USER,
} from "../types";
import axios from "axios";

export const userLogin = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(result => {
      setAuthorizationHeader(result.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const userLogout = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const userSignup = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then(result => {
      setAuthorizationHeader(result.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then(result => {
      dispatch({
        type: SET_USER,
        payload: result.data.userData,
      });
    })
    .catch(err => {
      console.error(err);
    });
};

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
