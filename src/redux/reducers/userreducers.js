import {
  PROFILE_DETAILS
} from "../actions/profile";

const initialState = {
  profileDetails: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_DETAILS:
      return { ...state, profileDetails: action.payload };
    default:
      return state;
  }
}