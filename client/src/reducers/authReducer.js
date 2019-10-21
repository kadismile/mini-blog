import * as type from '../constants/ActionTypes'

const initialState = {
  isAuthenticated: false,
  email: '',
  role:'',
  username: '',
  name: '',
  _id: ''
};

//REDUCER
export default function authReducer(state=initialState, action){

  switch (action.type) {

    case type.IS_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: true,
        email: action.data.email,
        role: action.data.role,
        username: action.data.username,
        name: action.data.name,
        _id: action.data._id
      }
    }

    case type.FAILED_AUTH: {
      return {
        ...state,
        failedAuth: true
      }
    }

    case type.IS_LOGGED_OUT: {
      return {
        ...state,
        isAuthenticated: false,
        email: '',
        role:'',
        username: '',
        name: '',
        _id: ''
      }
    }

    default: return state
  }
}