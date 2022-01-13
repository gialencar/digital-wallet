// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE, FETCH_CURRENCIES_FAILURE, FETCH_CURRENCIES_SUCCESS, UPDATE_TOTAL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: null,
  total: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    // console.log('123123213', action.payload);
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case FETCH_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };

  case FETCH_CURRENCIES_FAILURE:
    return {
      ...state,
      error: action.payload,
    };

  case UPDATE_TOTAL:
    return {
      ...state,
      total: action.payload,
    };

  default:
    return state;
  }
};

export default walletReducer;
