// Coloque aqui suas actions
import getUrl from '../services/getUrl';

export const USER_LOGIN = ' USER_LOGIN';
export const CURRENCIES_ACTION = 'CURRENCIES_ACTION';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

const apiCurrencies = (payload) => ({
  type: CURRENCIES_ACTION,
  payload,
});

export const getApi = () => async (dispatch) => {
  try {
    const response = await getUrl();
    const moedas = Object.keys(response)
      .filter((moeda) => moeda !== 'USDT');
    dispatch(apiCurrencies(moedas));
  } catch (err) {
    return err;
  }
};
