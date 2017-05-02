/**
 * Created by wojciech on 01.05.17.
 */
import React from "react";
import {Button, Table} from "semantic-ui-react";

const User = (props) => (
  <Table.Row>
    <Table.Cell textAlign='center'>{props.user.username}</Table.Cell>
    <Table.Cell textAlign='center'><Button color='red' onClick={props.handleDeleteUser} >Usuń go</Button></Table.Cell>
  </Table.Row>
);

User.PropTypes = {
  handleDeleteUser: React.PropTypes.func
};

export default User;