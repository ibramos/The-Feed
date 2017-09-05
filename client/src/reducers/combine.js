import { combineReducers } from "redux";
import oAuthReducer from "./oAuthReducer";

export default combineReducers({
  oAuth: oAuthReducer
});
