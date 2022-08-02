import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../pages/header.css';

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
        <h2>Header</h2>
        <div className="header">
          <p data-testid="email-field">{`Email: ${email}`}</p>
          <div className="header-context">
            <p className="tag-p">Despesa Totais:</p>
            <p
              data-testid="total-field"
            >
              { this.valueTransform()}
            </p>
            <p className="tag-p" data-testid="header-currency-field">BRL</p>
          </div>
        </div>
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
