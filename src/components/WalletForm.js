import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getApi as getApiFetch } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { getApi } = this.props;
    getApi();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <p>WalletForm</p>
        <labe htmlFor="valor-input">
          Valor:
          <input
            id="valor-input"
            data-testid="value-input"
            type="number"
          />
        </labe>

        <labe htmlFor="valor-input">
          Descrição:
          <input
            id="valor-input"
            data-testid="description-input"
            type="text"
          />
        </labe>

        <select data-testid="currency-input">
          {currencies.map((moedas) => <option key={ moedas }>{moedas}</option>)}
        </select>

        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getApi: () => dispatch(getApiFetch()),
});

WalletForm.propTypes = {
  getApi: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
