// Coloque aqui suas actions
import getUrl from '../services/getUrl';

export const USER_LOGIN = ' USER_LOGIN';
export const CURRENCIES_ACTION = 'CURRENCIES_ACTION';
export const EXPENSES_ACTION = 'EXPENSES_ACTION';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

const apiCurrencies = (payload) => ({
  type: CURRENCIES_ACTION,
  payload,
});

export const getExpenses = (payload) => ({
  type: EXPENSES_ACTION,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSES,
  payload,
});

export const getApi = () => async (dispatch) => {
  try {
    const response = await getUrl();
    const moedas = Object.entries(response)
      .filter((moeda) => moeda[0] !== 'USDT');
    const reponseNovo = Object.fromEntries(moedas);
    dispatch(apiCurrencies(Object.keys(reponseNovo)));
  } catch (err) {
    return err;
  }
};

export const getExpensesFetch = (expenses) => async (dispatch) => {
  try {
    const currencies = await getUrl();
    dispatch(getExpenses({
      ...expenses,
      exchangeRates: currencies,
    }));
  } catch (err) {
    return err;
  }
};
