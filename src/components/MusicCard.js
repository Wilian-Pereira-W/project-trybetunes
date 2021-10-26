import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { albums: {
      trackName,
      previewUrl,
    } } = this.props;
    return (
      <div data-testid="page-album">
        <section>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>

        </section>
      </div>
    );
  }
}

MusicCard.propTypes = {
  albums: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};
export default MusicCard;
