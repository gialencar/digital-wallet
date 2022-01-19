import fetchCurrencies from '../api';

export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const UPDATE_TOTAL = 'UPDATE_TOTAL';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const START_EXPENSE_EDIT = 'START_EXPENSE_EDIT';
export const FINISH_EDIT = 'FINISH_EDIT';

export const loginAction = (email) => ({
  type: LOGIN,
  payload: email,
});

export function addExpenseAction(expenses) {
  return async (dispatch) => {
    const data = await fetchCurrencies();
    dispatch({
      type: ADD_EXPENSE,
      payload: { ...expenses, exchangeRates: data },
    });
  };
}

export function fetchCurrenciesAction() {
  return async (dispatch) => {
    const data = await fetchCurrencies();
    const currencies = Object.keys(data);
    dispatch({
      type: FETCH_CURRENCIES,
      payload: currencies,
    });
  };
}

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  payload: id,
});

export const editExpenseAction = (id) => ({
  type: START_EXPENSE_EDIT,
  payload: id,
});

export const finishExpenseEditAction = (payload) => ({
  type: FINISH_EDIT,
  payload,
});
