import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      activateLoading: false,
    };
  }

  componentDidMount() {
    this.showUserName();
  }

  async showUserName() {
    this.setState({ activateLoading: true });
    const data = await getUser();
    this.setState({
      name: data,
      activateLoading: false,
    });
  }

  render() {
    const { activateLoading, name: { name } } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">

          { activateLoading ? <Loading /> : name}
        </p>
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
