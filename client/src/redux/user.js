import Axios from "axios";
import Utils from "../utils/utils"
export const types = {
  SET : 'SET',
  CLEAN : 'CLEAN',
  SIGNUP : 'SIGNUP',
  UPDATE : 'UPDATE',
  SET_AVATAR : 'SET_AVATAR',
  LOGIN : 'LOGIN',
  LOGOUT : 'LOGOUT'
}

// const initialState = {
//   id : null,
//   username : null,
//   email : null,
//   bio : null,
//   avatarPath: null
// }
const initialState = null;

const pageState = (state = initialState, action) => {
  switch (action.type) {
    case types.SET:
      console.log(action)
      return {
        id: action.id,
        username: action.username,
        password: action.password,
        bio: action.bio,
        email:action.email,
        avatarPath: action.avatarPath
      };
    case types.LOGOUT:
      return initialState;
    case types.CLEAN:
      return initialState;
    default:
      return state;
  }
}

export default pageState;

// Action Creators
export const actions = {
  set: (id, username, bio, email, avatarPath) => ({
      type: types.SET,
      id,
      username,
      bio,
      email,
      avatarPath
    }),
  signup: (callback) => (username, password, email) => (dispatch) => {
    let param = new URLSearchParams();
    param.append("username", username);
    param.append("email", email);
    param.append("password", password);
    Axios({
      method: "POST",
      url: "user/signup",
      data: param
    })
    .then(response => {
      let respdata = response.data;
      console.log(respdata)
      if (respdata.code === 200) {
        dispatch(actions.set(respdata.data.id, respdata.data.username, "", respdata.data.email, ""));
      }
      callback(respdata);
    })
    .catch(error => {
      console.log(error);
    });
  },
  update: (username, password, bio, email) => ({
      type: types.UPDATE,
      username,
      password,
      bio,
      email
    }),
  setAvatar: (avatarPath) => ({
    type: types.SET_AVATAR,
    avatarPath
  }),
  login: (callback) => (username, password) => (dispatch) => {
    let param = new URLSearchParams();
    param.append("username", username);
    param.append("password", password);
    Axios({
      method: "POST",
      url: "user/login",
      data: param
    })
    .then(response => {
      let respdata = response.data;
      console.log(respdata)
      if (respdata.code === 200) {
        dispatch(actions.set(respdata.data.id, respdata.data.username, respdata.data.bio, respdata.data.email, respdata.data.avatarPath));
      }
      callback(respdata);
    })
    .catch(error => {
      console.log(error);
    });
  },
  logout: (username, password) => ({
      type: types.LOGOUT
    }), 
  clean: () => ({
      type: types.CLEAN
    })
}
