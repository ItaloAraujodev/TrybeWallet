import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLogin as actionLogin } from '../redux/actions';
import './AppUser.css';

const reget = /\S+@\S+\.\S+/;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      valid: { emails: false, senha: false },
      page: false,
    };
  }

  validationInputs = () => {
    const { email, password } = this.state;
    const num = 6;
    this.setState({
      valid: { emails: reget.test(email), senha: password.length >= num },
    });
  }

  inputOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validationInputs());
  }

  ValidButton = () => {
    const { userLogin } = this.props;
    const { email } = this.state;
    this.setState({ page: true });
    userLogin(email);
  }

  render() {
    const { email, password, valid, page } = this.state;
    return (
      <div className="form-container">
        {page && <Redirect to="/carteira" />}
        <div className="box">
          <h2>Login</h2>
          <label htmlFor="loginEmail">
            <input
              className="input"
              data-testid="email-input"
              id="loginEmail"
              name="email"
              type="email"
              value={ email }
              placeholder="Digite seu E-mail"
              onChange={ this.inputOnChange }
            />
          </label>

          <label htmlFor="loginSenha">
            <input
              className="input"
              data-testid="password-input"
              name="password"
              id="loginSenha"
              type="password"
              value={ password }
              placeholder="Digite sua senha"
              onChange={ this.inputOnChange }
            />
          </label>

          <button
            className="input-submit"
            type="button"
            disabled={ !(valid.emails && valid.senha) }
            onClick={ this.ValidButton }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (payload) => dispatch(actionLogin(payload)),

});

export default connect(null, mapDispatchToProps)(Login);
