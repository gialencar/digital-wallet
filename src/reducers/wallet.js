// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE, FETCH_CURRENCIES, UPDATE_TOTAL, REMOVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case FETCH_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };

  case UPDATE_TOTAL:
    return {
      ...state,
      total: action.payload,
    };

  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.payload),
    };

  default:
    return state;
  }
};

export default walletReducer;
