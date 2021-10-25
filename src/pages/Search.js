import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isSaveButtonDisabled: true,
      activateLoading: false,
      artistName: '',
      album: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.validarInput = this.validarInput.bind(this);
    this.buscarArtista = this.buscarArtista.bind(this);
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

  async buscarArtista(evento) {
    evento.preventDefault();
    this.setState({ activateLoading: true });
    const { name } = this.state;
    const data = (await searchAlbumsAPI((name)));
    this.setState({
      name: '',
      artistName: name,
      activateLoading: false,
      album: data,
    });
  }

  render() {
    const { name, artistName, isSaveButtonDisabled, activateLoading, album } = this.state;
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
            onClick={ this.buscarArtista }
            data-testid="search-artist-button"
            type="submit"
          >
            Pesquisar

          </button>
        </form>
        <p>
          {`Resultado de álbuns de: ${artistName}` }
        </p>
        <p>{album.artistName}</p>
        <p>
          {album.length !== 0 ? album.map((artista) => (
            <section key={ artista.collectionId }>
              <Link
                to={ `/album/${artista.collectionId}` }
                data-testid={ `link-to-album-${artista.collectionId}` }
              >
                <h3>{artista.collectionName}</h3>
                <img src={ artista.artworkUrl100 } alt={ artista.collectionName } />
              </Link>
            </section>
          )) : 'Nenhum álbum foi encontrado' }

        </p>
      </div>
    );
  }
}

export default Search;
