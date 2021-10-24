import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isSaveButtonDisabled: true,
      activateLoading: false,
      changingPages: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.validarInput = this.validarInput.bind(this);
    this.whenToClick = this.whenToClick.bind(this);
  }

  onInputChange({ target }) {
    const { id, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;

    this.setState({ [id]: value }, this.validarInput);
  }

  validarInput() {
    const { name } = this.state;
    const valorDigitado = name;
    const minimoDeCaracteres = 3;
    if (valorDigitado.length >= minimoDeCaracteres) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  async whenToClick(evento) {
    evento.preventDefault();
    const { name } = this.state;
    this.setState({ activateLoading: true });
    await createUser({ name });
    this.setState({
      activateLoading: true,
      changingPages: true,
    });
  }

  render() {
    const { name, isSaveButtonDisabled, activateLoading, changingPages } = this.state;

    return (
      <div data-testid="page-login">
        <form>
          { activateLoading ? <Loading /> : ''}
          {/** Source: https://reactrouter.com/web/api/Redirect/ */}
          { changingPages ? <Redirect to="/search" /> : ''}
          <input
            data-testid="login-name-input"
            onChange={ this.onInputChange }
            value={ name }
            id="name"
          />
          <button
            disabled={ isSaveButtonDisabled }
            onClick={ this.whenToClick }
            data-testid="login-submit-button"
            type="submit"
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

export default Login;
