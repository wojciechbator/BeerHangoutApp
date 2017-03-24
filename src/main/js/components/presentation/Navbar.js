import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import Link from 'react-router';

require('../../../../../node_modules/semantic-ui/dist/components/menu.min.css');
require('../../../../../node_modules/semantic-ui/dist/components/segment.min.css');

export default class Navbar extends Component {
  state = { activeItem: 'Home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
        <Menu inverted fixed="top">
          <Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
          <Menu.Item name='Friends' active={activeItem === 'Friends'} onClick={this.handleItemClick} />
          <Menu.Item name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick}>
            {/*<Link to='/signin'/>*/}
          </Menu.Item>
        </Menu>
    );
  }
}
