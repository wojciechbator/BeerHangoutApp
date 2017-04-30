import React, {Component} from "react";
import {connect} from 'react-redux';
import {Menu} from "semantic-ui-react";
import {Link} from "react-router";

require('../../../../../node_modules/semantic-ui/dist/components/menu.min.css');
require('../../../../../node_modules/semantic-ui/dist/components/segment.min.css');

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Home',
      signedIn: false
    };
  }

  handleItemClick = (event, {name}) => this.setState({activeItem: name});

  render() {
    const {activeItem} = this.state;

    return (
      <Menu inverted fixed="top">
        <Menu.Item as={Link} to='/' name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick}/>
        <Menu.Item as={Link} to='/friends' name='Friends' active={activeItem === 'Friends'}
                   onClick={this.handleItemClick}/>
        {this.props.signedIn ? <Menu.Menu position='right'>
          <Menu.Item as={Link} to='/admin' name='Admin' active={activeItem === 'Admin'}
                     onClick={this.handleItemClick}/>
          <Menu.Item as={Link} to='/chat' name='Chat' active={activeItem === 'Chat'}
                     onClick={this.handleItemClick}/>
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
  signedIn: React.PropTypes.boolean
};

const mapStateToProps = (store) => {
  return {
    signedIn: store.auth.signedIn
  }

};

export default connect(mapStateToProps)(Navbar);
