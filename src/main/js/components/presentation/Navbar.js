import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "semantic-ui-react";
import {Link} from "react-router";

import {menuButton} from '../styles/styles';
import {logoutRequest} from "../../redux/authentication/authActions";

require('../../../../../node_modules/semantic-ui/dist/components/menu.min.css');
require('../../../../../node_modules/semantic-ui/dist/components/segment.min.css');

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem || 'Home',
      signedIn: false
    };
  }

  handleLogoutRequest = (event) => {
    event.persist();
    this.props.dispatch(logoutRequest());
  };

  handleItemClick = (event, {name}) => this.setState({activeItem: name});

  render() {
    const {activeItem} = this.state;

    return (
      <Menu inverted fixed="top">
        <Menu.Item as={Link} to='/' name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick}/>
        <Menu.Item as={Link} to='/' name='Konto' active={activeItem === 'Konto'}
                   onClick={this.handleItemClick}/>
        <Menu.Item as={Link} to='/' name='Ulubione' active={activeItem === 'Ulubione'}
                   onClick={this.handleItemClick}/>
        {this.props.signedIn ?
            <Menu.Menu position='right'>
          <Menu.Item as={Link} to='/admin' name='Admin' active={activeItem === 'Admin'}
                     onClick={this.handleItemClick}/>
              <Menu.Item as={Link} to='/admin' name='Ustawienia' active={activeItem === 'Ustawienia'}
                         onClick={this.handleItemClick}/>
          <Menu.Item as={Link} to='/login' name='Wyloguj' active={activeItem === 'Logout'}
                     onClick={this.handleLogoutRequest}/>
        </Menu.Menu>
          :
          <Menu.Menu position='right'>
            <Menu.Item as={Link} to='/login' name='Zaloguj' active={activeItem === 'Zaloguj'}
                       onClick={this.handleItemClick}/>
            <Menu.Item as={Link} to='/register' name='Rejestracja' active={activeItem === 'Rejestracja'}
                       onClick={this.handleItemClick}/>
          </Menu.Menu>}

      </Menu>
    );
  }
}

Navbar.propTypes = {
  activeItem: React.PropTypes.string,
  signedIn: React.PropTypes.bool
};

const mapStateToProps = (store) => {
  return {
    signedIn: store.auth.signedIn
  }

};

export default connect(mapStateToProps)(Navbar);
