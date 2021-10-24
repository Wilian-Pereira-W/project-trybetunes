import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isSaveButtonDisabled: true,
      activateLoading: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.validarInput = this.validarInput.bind(this);
  }

  onInputChange({ target }) {
    const { id, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;

    this.setState({ [id]: value }, this.validarInput);
  }

  validarInput() {
    const { name } = this.state;
    const valorDigitado = name;
    const minimoDeCaracteres = 2;
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

  render() {
    const { name, isSaveButtonDisabled, activateLoading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          { activateLoading ? <Loading /> : ''}
          <input
            data-testid="search-artist-input"
            onChange={ this.onInputChange }
            value={ name }
            id="name"
          />
          <button
            disabled={ isSaveButtonDisabled }
            onClick={ this.whenToClick }
            data-testid="search-artist-button"
            type="submit"
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
