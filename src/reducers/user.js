// Esse reducer será responsável por tratar as informações da pessoa usuária

import { LOGIN } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      // user: {
      //   email: action.payload,
      // },
    };
  default:
    return state;
  }
};

export default userReducer;
