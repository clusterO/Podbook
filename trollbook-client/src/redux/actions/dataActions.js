import {
  SET_TROLLS,
  LOADING_DATA,
  LIKE_TROLL,
  UNLIKE_TROLL,
  DELETE_TROLL,
  POST_TROLL,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_TROLL,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
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

export const deleteTroll = trollId => dispatch => {
  axios
    .delete(`/troll/${trollId}`)
    .then(() => {
      dispatch({
        type: DELETE_TROLL,
        payload: trollId,
      });
    })
    .catch(err => console.error(err));
};

export const postTroll = troll => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/troll", troll)
    .then(result => {
      dispatch({
        type: POST_TROLL,
        payload: result.data,
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getTroll = trollId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/troll/${trollId}`)
    .then(result => {
      dispatch({
        type: SET_TROLL,
        payload: result.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.error(err));
};

export const submitComment = (trollId, commentData) => dispatch => {
  axios
    .post(`/troll/${trollId}/comment`, commentData)
    .then(result => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: result.data,
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
