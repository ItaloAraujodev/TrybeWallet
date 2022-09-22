import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from './WalletForm';
/* CSS */
import './header.css';
import '../pages/AppUser.css';
/* IMAGENS */
import icone from '../imagens/icone.png';
import moedas from '../imagens/Moedas.png';
import perfil from '../imagens/perfil.png';

class Header extends Component {
  valueTransform = () => {
    const { expenses } = this.props;
    const value = expenses.reduce((acc, curr) => (
      acc + curr.exchangeRates[curr.currency].ask * Number(curr.value)
    ), 0);
    return value.toFixed(2);
  }

  render() {
    const { email } = this.props;

    return (
      <div className="header-container">
        <div className="header-context">
          <div className="icon-logo">
            <img src={ icone } alt="icone" />
            <p>
              {' '}
              Trybe
              <span>
                {' '}
                Wallet
              </span>
            </p>
          </div>
          <div className="header-despesas">
            <img src={ moedas } alt="Moedas" />
            <p>
              Total de despesas:
              <span>{ this.valueTransform() }</span>
              <span>BRL</span>
            </p>
          </div>
          <div className="header-email">
            <img src={ perfil } alt="Perfil" />
            <p data-testid="email-field">{`Email: ${email}`}</p>
          </div>
        </div>
        <WalletForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

export default connect(mapStateToProps)(Header);
