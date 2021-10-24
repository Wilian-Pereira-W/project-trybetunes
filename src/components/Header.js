import React from 'react';
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
      </header>
    );
  }
}

export default Header;
