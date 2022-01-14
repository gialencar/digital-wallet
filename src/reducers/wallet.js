import {
  ADD_EXPENSE, FETCH_CURRENCIES, REMOVE_EXPENSE, START_EXPENSE_EDIT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editingExpense: false,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.map((exp, i) => ({ ...exp, id: i || 0 })),
        action.payload,
      ],
    };

  case FETCH_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };

  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .filter((exp) => exp.id !== action.payload),
    };

  case START_EXPENSE_EDIT:
    return {
      ...state,
      editingExpense: true,
    };

  default:
    return state;
  }
};

export default walletReducer;
