import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getApi as getApiFetch,
  getExpensesFetch as getExpensesAction } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { getApi } = this.props;
    getApi();
  }

  handChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  addDespesas = () => {
    const { getExpensesFetch } = this.props;
    getExpensesFetch(this.state);
    console.log('Adicionado');
    this.setState({ value: '', description: '' });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency } = this.state;
    return (
      <div>
        <p>WalletForm</p>
        <label htmlFor="valor-input">
          Valor:
          <input
            id="valor-input"
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handChange }
          />
        </label>

        <label htmlFor="valor-input">
          Descrição:
          <input
            id="valor-input"
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handChange }
          />
        </label>

        <select
          data-testid="currency-input"
          onChange={ this.handChange }
          name="currency"
          value={ currency }
        >
          {currencies
            .map((moedas) => <option value={ moedas } key={ moedas }>{moedas}</option>)}
        </select>

        <select
          data-testid="method-input"
          onChange={ this.handChange }
          name="method"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select
          data-testid="tag-input"
          onChange={ this.handChange }
          name="tag"
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>

        <button
          type="button"
          onClick={ this.addDespesas }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getApi: () => dispatch(getApiFetch()),
  getExpensesFetch: (expenses) => dispatch(getExpensesAction(expenses)),
});

WalletForm.propTypes = {
  getApi: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getExpensesFetch: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
