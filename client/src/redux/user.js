import Axios from "axios";
import Utils from "../util/utils"
export const types = {
  SET : 'SET',
  CLEAN : 'CLEAN',
  SIGNUP : 'SIGNUP',
  UPDATE : 'UPDATE',
  SET_AVATAR : 'SET_AVATAR',
  LOGIN : 'LOGIN',
  LOGOUT : 'LOGOUT'
}

const initialState = {
  id : null,
  username : null,
  email : null,
  bio : null,
  avatarPath: null
}

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
  signup: (username, email, password, password_again) => (
    Axios({
      method: "POST",
      url: "api/signup",
      data: {
        username,
        email,
        password,
        password_again
      }
    })
    .then(response => {
      let { mssg, success } = data
      if (success) {
        Notify({ value: mssg, done: () => location.href = redirect })
        btn.attr('value', 'Redirecting..')
        overlay2.show()
      } else {
        Notify({ value: mssg })
        btn
          .attr('value', defBtnValue)
          .removeClass('a_disabled')
        overlay2.hide()
      }
    })
    .catch(error => {
      console.log(error);
    });
  ),
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
  login: (username, password) => ({
      type: types.SET_COMPARE_INDEX,
      username,
      password
    }),
  logout: (username, password) => ({
      type: types.SET_COMPARE_INDEX,
      username,
      password
    }), 
  clean: () => ({
      type: types.CLEAN
    })
}