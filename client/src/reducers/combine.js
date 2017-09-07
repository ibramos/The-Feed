import { combineReducers } from "redux";
import { reducer as reduxForm} from "redux-form";
import oAuthReducer from "./oAuthReducer";

export default combineReducers({
  oAuth: oAuthReducer,
  form: reduxForm
});
