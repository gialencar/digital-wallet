import {
  ADD_EXPENSE, FETCH_CURRENCIES, FINISH_EDIT, REMOVE_EXPENSE, START_EXPENSE_EDIT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isEditingExpense: false,
  editingId: '',
};

const removeExp = (expenses, id) => (
  expenses.filter((exp) => exp.id !== id)
);

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
      isEditingExpense: !state.isEditingExpense,
      editingId: action.payload,
    };

  case FINISH_EDIT:
    return {
      ...state,
      isEditingExpense: !state.isEditingExpense,
      expenses: [
        ...removeExp(state.expenses, state.editingId), action.payload]
        .sort((a, b) => a.id - b.id),
    };

  default:
    return state;
  }
};

export default walletReducer;
