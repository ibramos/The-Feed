import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      //false is used when action.payload is an empty string/user is not signed in
      return action.payload || false;
    default:
      return state;
  }
}
