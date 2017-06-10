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
        {/*<Menu.Item name='Chat' active={activeItem === 'Chat'}*/}
                   {/*onClick={event.target.port=8081}/>*/}
        <a href="http://localhost:8081" style={menuButton}>Chat</a>
        {this.props.signedIn ? <Menu.Menu position='right'>
          <Menu.Item as={Link} to='/admin' name='Admin' active={activeItem === 'Admin'}
                     onClick={this.handleItemClick}/>
          <Menu.Item as={Link} to='/login' name='Logout' active={activeItem === 'Logout'}
                     onClick={this.handleLogoutRequest}/>
        </Menu.Menu>
          :
          <Menu.Menu position='right'>
            <Menu.Item as={Link} to='/login' name='Login' active={activeItem === 'Login'}
                       onClick={this.handleItemClick}/>
            <Menu.Item as={Link} to='/register' name='Register' active={activeItem === 'Register'}
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
