import {
  FETCH_NUMBER_LIST,
  GET_SAVED_DATA,
  LOAD,
  NOT_FOUND
} from "../actions/types";

const initialState = {
  projectData: "",
  savedData: [],
  loading: false,
  notFound: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_NUMBER_LIST:
      return {
        ...state,
        projectData: action.payload
      };
    case GET_SAVED_DATA:
      return {
        ...state,
        savedData: action.payload,
        loading: false
      };
    case LOAD:
      return {
        ...state,
        loading: !state.loading,
        notFound: false
      };
    case NOT_FOUND:
      return {
        ...state,
        notFound: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
