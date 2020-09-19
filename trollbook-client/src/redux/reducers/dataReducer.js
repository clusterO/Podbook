import {
  SET_TROLLS,
  SET_TROLL,
  LIKE_TROLL,
  UNLIKE_TROLL,
  LOADING_DATA,
  DELETE_TROLL,
  POST_TROLL,
} from "../types";

const initialState = {
  trolls: [],
  troll: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_TROLLS:
      return {
        ...state,
        trolls: action.payload,
        loading: false,
      };
    case SET_TROLL:
      return {
        ...state,
        troll: action.payload,
      };
    case LIKE_TROLL:
    case UNLIKE_TROLL:
      let index = state.trolls.findIndex(
        troll => troll.trollId === action.payload.trollId
      );
      state.trolls[index] = action.payload;
      return {
        ...state,
      };
    case DELETE_TROLL:
      let trollIndex = state.trolls.findIndex(
        troll => troll.trollId === action.payload
      );
      state.trolls.splice(trollIndex, 1);
      return {
        ...state,
      };
    case POST_TROLL:
      return {
        ...state,
        trolls: [action.payload, ...state.trolls],
      };
    default:
      return state;
  }
}
