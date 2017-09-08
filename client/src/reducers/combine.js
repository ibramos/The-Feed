import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import oAuthReducer from "./oAuthReducer";
import surveysReducer from "./surveysReducer";

export default combineReducers({
  oAuth: oAuthReducer,
  form: reduxForm,
  surveys: surveysReducer
});
