import { combineReducers } from "redux";
import DataReducer from "./DataReducer";

export default combineReducers({
  allData: DataReducer
});

export const getNumbersList = state => state.allData.projectData;
export const getSavedResults = state => state.allData.savedData;
export const isLoading = state => state.allData.loading;
export const isNotFound = state => state.allData.notFound;
