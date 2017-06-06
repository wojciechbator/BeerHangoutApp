import React from "react";
import {Grid} from "semantic-ui-react";

import {userStyle} from "../styles/styles";
/**
 * Created by wojciech on 11.04.17.
 */

const SidebarRow = (props) => (
  <Grid.Row verticalAlign="middle" style={userStyle.userList}>
    <Grid.Column width={4}>
      {props.data.username}
    </Grid.Column>
    <Grid.Column width={4}>
      {props.data.lastName}
    </Grid.Column>


  <Grid.Column width={1}  >
        {props.data.is_active ? "☑" : "☐"}
    </Grid.Column>
  </Grid.Row>
);

SidebarRow.propTypes = {
  data: React.PropTypes.object.isRequired
};

//TODO: Connect with redux

export default SidebarRow;