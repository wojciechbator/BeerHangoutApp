import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router';

require('../../../../../node_modules/semantic-ui/dist/components/menu.min.css');
require('../../../../../node_modules/semantic-ui/dist/components/segment.min.css');

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Home',
      authFailed: false
    };
  }

  handleItemClick = (event, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted fixed="top">
        <Menu.Item as={Link} to='/' name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
        <Menu.Item as={Link} to='/friends' name='Friends' active={activeItem === 'Friends'} onClick={this.handleItemClick} />
        {/*{this.props.roles === 'ROLE_ANONYMOUS' ? <Menu.Item as={Link} to='/register' name='register' active={activeItem === 'register'} onClick={this.handleItemClick} />}*/}
        <Menu.Item as={Link} to='/signin' name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick} />
      </Menu>
    );
  }
}