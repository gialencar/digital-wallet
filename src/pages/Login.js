import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loginBtnDisabled: true,
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value }, () => {
      this.handleValidation();
    });
  }

  handleValidation = () => {
    const { email, password } = this.state;
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const minPasswordLenght = 6;
    const isEmailValid = !!email.match(emailFormat);
    const isPasswordValid = password.length >= minPasswordLenght;
    // console.log(isEmailValid, isPasswordValid);
    if (isEmailValid && isPasswordValid) {
      this.setState({ loginBtnDisabled: false }, () => {
        // console.log('Form validated!');
      });
    } else {
      this.setState({ loginBtnDisabled: true });
    }
  }

  onFormSubmit = () => {
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);
    history.push('/carteira');
  }

  render() {
    const { loginBtnDisabled, email, password } = this.state;

    return (
      <div>
        <form>

          <label htmlFor="email">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              data-testid="password-input"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            disabled={ loginBtnDisabled }
            onClick={ this.onFormSubmit }
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
