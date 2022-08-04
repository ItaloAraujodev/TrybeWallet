// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES_ACTION, EXPENSES_ACTION, DELETE_EXPENSES } from '../actions';

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
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.payload),
    };

  default:
    return state;
  }
}

export default wallet;
