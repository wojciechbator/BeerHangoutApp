/**
 * Created by wojciech on 01.05.17.
 */

import React, {Component} from "react";
import {connect} from "react-redux";
import {Container, Header, Table} from "semantic-ui-react";
import User from "../presentation/User";
import {deleteUser, refreshUsers} from "../../redux/users/usersActions";

require('../../../../../node_modules/semantic-ui/dist/components/table.min.css');
require('../../../../../node_modules/semantic-ui/dist/components/container.min.css');

class UserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(refreshUsers());
    this.setState({
      users: this.props.users
    });
  }

  handleDeleteUser(user) {
    this.props.dispatch(deleteUser(user));
    this.props.dispatch(refreshUsers());
  }

  render() {
    return (
      <div>
        <Container>
          <Header textAlign='center'>Użytkownicy w panelu admina</Header>
          <Table celled inverted selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'>User</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.users.map((person, i) => <User key={i} data={person}
                                                         handleDeleteUser={this.handleDeleteUser}/>)}
            </Table.Body>
          </Table>
        </Container>
      </div>
    );
  }
}

UserContainer.propTypes = {
  users: React.PropTypes.array
};

const mapStateToProps = (store) => {
  return {
    users: store.users.data
  };
};

export default connect(mapStateToProps)(UserContainer);