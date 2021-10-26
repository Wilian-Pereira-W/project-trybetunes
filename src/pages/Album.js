import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albums: [],
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
      albums: data,
      nomeArtista: data[0].artistName,
      nomeAlbum: data[0].collectionName,
    });
  }

  render() {
    const { albums, nomeArtista, nomeAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{nomeArtista}</p>
        <p data-testid="album-name">{nomeAlbum}</p>
        {albums.slice(1).map((musica) => (
          <MusicCard
            key={ musica.collectionId }
            albums={ musica }
          />))}
        ;
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
