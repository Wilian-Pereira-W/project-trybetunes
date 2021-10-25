import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      nomeArtista: '',
      nomeAlbum: '',
    };
    this.buscarid = this.buscarid.bind(this);
  }

  componentDidMount() {
    this.buscarid();
  }

  async buscarid() {
    const { match } = this.props;
    const valorId = match.params.id;
    const data = (await getMusics((valorId)));
    this.setState({
      album: data,
      nomeArtista: data[0].artistName,
      nomeAlbum: data[0].collectionName,
    });
  }

  render() {
    const { album, nomeArtista, nomeAlbum } = this.state;
    return (
      <div data-testid="page-album">
        {console.log(album.slice(1))}
        <Header />
        <p data-testid="artist-name">{nomeArtista}</p>
        <p data-testid="album-name">{nomeAlbum}</p>
        {album.slice(1).map((musica) => (
          <section key={ musica.collectionId }>
            <p>{musica.trackName}</p>
            <audio data-testid="audio-component" src={ musica.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
          </section>
        ))}
      </div>
    );
  }
}

export default Album;
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
