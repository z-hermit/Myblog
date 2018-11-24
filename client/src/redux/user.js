import Axios from "axios";
import Utils from "../util/utils"
export const types = {
  SET : 'SET',
  CLEAN : 'CLEAN',
}

const initialState = {
  id : null,
  username : null,
  email : null,
  bio : null,

}

const pageState = (state = initialState, action) => {
  switch (action.type) {
    case types.SET:
      return {
        ...state,
        inUseIndex:action.index,
      };
    case types.CLEAN:
      return initialState;
    default:
      return state;
  }
}

export default pageState;

// Action Creators
export const actions = {
  set: (index) => ({
      type: types.SET_INUSE_INDEX,
      index
    }),
  create: (username, password, bio, email) => ({
      type: types.SET_COMPARE_INDEX,
      username,
      password,
      bio,
      email
    }),
  update: (username, password, bio, email) => ({
      type: types.SET_COMPARE_INDEX,
      username,
      password,
      bio,
      email
    }),
  setAvatar: 
  clean: () => ({
      type: types.CLEAN
    })
}