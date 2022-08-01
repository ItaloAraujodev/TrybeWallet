// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES_ACTION, EXPENSES_ACTION } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,

};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCIES_ACTION:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSES_ACTION:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        ...action.payload,
      }],
    };
  default:
    return state;
  }
}

export default wallet;
