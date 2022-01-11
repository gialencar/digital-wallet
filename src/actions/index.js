// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const loginAction = (payload) => ({
  type: LOGIN,
  email: payload,
});

export const addExpenseAction = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});
