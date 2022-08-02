import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from './Table';
import '../pages/formWalet.css';
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
        <div className="container-form">
          <label htmlFor="valor-input">
            <span>Valor:</span>
            <input
              className="input-valor "
              id="valor-input"
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handChange }
            />
          </label>

          <span>Moeda:</span>
          <select
            className="input-valor "
            data-testid="currency-input"
            onChange={ this.handChange }
            name="currency"
            value={ currency }
          >
            {currencies
              .map((moedas) => <option value={ moedas } key={ moedas }>{moedas}</option>)}
          </select>

          <label htmlFor="valor-input">
            <span>Descrição:</span>
            <input
              className="inputs"
              id="valor-input"
              type="text"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handChange }
            />
          </label>
          <span>Metodo de pagamento:</span>
          <select
            className="inputs"
            data-testid="method-input"
            onChange={ this.handChange }
            name="method"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <span>Tag:</span>
          <select
            className="inputs"
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
            className="inputSub"
            type="button"
            onClick={ this.addDespesas }
          >
            Adicionar despesa
          </button>
        </div>
        <div>
          <Table />
        </div>

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
