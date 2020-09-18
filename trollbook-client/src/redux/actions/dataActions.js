import { SET_TROLLS, LOADING_DATA, LIKE_TROLL, UNLIKE_TROLL } from "../types";
import axios from "axios";

export const getTrolls = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/trolls")
    .then(result => {
      dispatch({
        type: SET_TROLLS,
        payload: result.data,
      });
    })
    .catch(err => {
      dispatch({
        type: SET_TROLLS,
        payload: [],
      });
    });
};

export const likeTroll = trollId => dispatch => {
  axios
    .get(`/troll/${trollId}/like`)
    .then(result => {
      dispatch({
        type: LIKE_TROLL,
        payload: result.data,
      });
    })
    .catch(err => console.error(err));
};

export const unlikeTroll = trollId => dispatch => {
  axios
    .get(`/troll/${trollId}/unlike`)
    .then(result => {
      dispatch({
        type: UNLIKE_TROLL,
        payload: result.data,
      });
    })
    .catch(err => console.error(err));
};
