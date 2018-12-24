import axios from "axios";
import { FETCH_NUMBER_LIST, GET_SAVED_DATA, LOAD, NOT_FOUND } from "./types";

// fetching the Number List
export const fetchNumberList = () => dispatch => {
  axios
    .get("https://cors.io/?https://www.di-mgt.com.au/primes10000.txt")
    .then(res => {
      dispatch({
        type: FETCH_NUMBER_LIST,
        payload: res.data
      });
    });
};

//fetch the saved data in backend
export const fetchSavedData = () => dispatch => {
  axios.get("/api/data").then(res => {
    dispatch({
      type: GET_SAVED_DATA,
      payload: res.data
    });
  });
};

//post the data in the backend
export const saveData = (searchValue, searchResult) => dispatch => {
  axios.post("/api/data", { searchValue, searchResult }).then(res => {
    dispatch(fetchSavedData());
  });
};

//find the first Prime Number containing the given string
export const findPrime = (list, searchValue) => dispatch => {
  dispatch({
    type: LOAD
  });

  setTimeout(() => {
    let i = 0;
    let j = 0;
    for (i = 0; i <= list.length; i++) {
      let counter = 0;
      for (j = 1; j <= list[i]; j++) {
        if (list[i] % j === 0) {
          counter++;
        }
      }
      if (counter === 2) {
        if (list[i].includes(searchValue)) {
          const searchResult = list[i];
          return dispatch(saveData(searchValue, searchResult));
        }
      }
    }
    return dispatch({
      type: NOT_FOUND,
      payload: true
    });
  }, 1000);
};
