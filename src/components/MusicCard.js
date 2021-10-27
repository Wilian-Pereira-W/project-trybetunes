import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      activateLoading: false,
      checked: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.recuperMusicaFavorita();
  }

  onInputChange({ target }) {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value,
    }, this.getFavoriteMusic);
  }

  async getFavoriteMusic() {
    const { albums } = this.props;
    this.setState({ activateLoading: true,
      checked: true,
    });
    await addSong(albums);
    this.setState({
      activateLoading: false,
    });
  }

  async recuperMusicaFavorita() {
    await getFavoriteSongs();
  }

  render() {
    const { activateLoading, checked } = this.state;
    const { albums: {
      trackName,
      previewUrl,
      trackId,
    } } = this.props;
    return (
      <div>
        { activateLoading ? <Loading /> : (
          <section>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId }>
              Favorita
              <input
                type="checkbox"
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                onClick={ this.onInputChange }
                checked={ checked }
                name="favorita"
              />

            </label>

          </section>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  albums: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
export default MusicCard;
