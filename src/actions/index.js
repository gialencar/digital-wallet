// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
// export const FETCH_CURRENCIES_BEGIN = 'FETCH_CURRENCIES_BEGIN';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_FAILURE = 'FETCH_CURRENCIES_FAILURE';
export const UPDATE_TOTAL = 'UPDATE_TOTAL';

export const loginAction = (email) => ({
  type: LOGIN,
  payload: email,
});

export const addExpenseAction = (expenses) => ({
  type: ADD_EXPENSE,
  payload: expenses,
});

export const fetchCurrenciesSuccess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  payload: currencies,
});

export const fetchCurrenciesFailure = (error) => ({
  type: FETCH_CURRENCIES_FAILURE,
  payload: { error },
});

export const updateTotal = (value) => ({
  type: UPDATE_TOTAL,
  payload: value,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      // const currencies = Object.keys(data).filter((key) => key !== 'USDT');
      // dispatch(fetchCurrenciesSuccess(currencies));
      // const currencies = Object.keys(data).map((key) => data[key]);
      dispatch(fetchCurrenciesSuccess(data));
    } catch (error) {
      dispatch(fetchCurrenciesFailure(error));
    }
  };
}
