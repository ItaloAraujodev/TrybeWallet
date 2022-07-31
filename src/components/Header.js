import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../pages/header.css';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div className="header-container">
        <h2>Header</h2>
        <div className="header">
          <p data-testid="email-field">{`Email: ${email}`}</p>
          <p data-testid="total-field">Despesa Total: 0</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
