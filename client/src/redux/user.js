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
      return {
        username: action.username,
        password: action.password,
        bio: action.bio,
        email:action.email,
        avatarPath: action.avatarPath
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
  set: (username, password, bio, email, avatarPath) => ({
      type: types.SET,
      username,
      password,
      bio,
      email,
      avatarPath
    }),
  signup: (callback) => (username, password, email) => (dispatch) => {
    let param = new URLSearchParams();
    param.append("username", username);
    param.append("email", email);
    param.append("password", password);
    console.log(callback)
    Axios({
      method: "POST",
      url: "user/signup",
      data: param
    })
    .then(response => {
      let data = response.data;
      console.log(data)
      if (data.code === 200) {
        dispatch(actions.set(data.username, data.password, "", data.email, ""));
        callback(response.data);
      }
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
  login: (callback) => (username, password) => {
    Axios({
      method: "POST",
      url: "user/login",
      data: {
        username,
        password
      }
    })
    .then(response => {
      // let { mssg, success } = response.data
      // if (success) {
      //   history.push("/home")
      // } else {
      //   Notify({ value: mssg })
      //   btn
      //     .attr('value', defBtnValue)
      //     .removeClass('a_disabled')
      //   overlay2.hide()
      // }
      callback(response)
    })
    .catch(error => {
      console.log(error);
    });
  },
  logout: (username, password) => ({
      type: types.SET_COMPARE_INDEX,
      username,
      password
    }), 
  clean: () => ({
      type: types.CLEAN
    })
}
