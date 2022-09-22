import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense as deleteExpenseAction } from '../redux/actions';
import './tableStyle.css';

class Table extends Component {
  render() {
    const { expensesState, deleteExpenses } = this.props;
    console.log(expensesState);
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expensesState
              .map(({ id, description, tag, method, value, exchangeRates, currency }) => (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{Number(value * exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <div className="button-icon">
                      <button
                        type="button"
                        data-testid="delete-btn"
                        name="excluir"
                        onClick={ () => deleteExpenses(id) }
                      >
                        <FontAwesomeIcon icon={ faPen } />
                      </button>

                      <button
                        type="button"
                        data-testid="delete-btn"
                        name="excluir"
                        onClick={ () => deleteExpenses(id) }
                      >
                        <FontAwesomeIcon icon={ faTrash } />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expensesState: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deleteExpenses: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteExpenses: (id) => dispatch(deleteExpenseAction(id)),
});

const mapStateToProps = (state) => ({
  expensesState: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
