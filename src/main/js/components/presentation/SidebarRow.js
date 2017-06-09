import React from "react";
import {Grid} from "semantic-ui-react";

import {userStyle} from "../styles/styles";
/**
 * Created by wojciech on 11.04.17.
 */


const SidebarRow = (props) => (
  <Grid.Row style={userStyle.userList}>
    <Grid.Column width={9}>
      {props.data.firstName} {props.data.lastName}
    </Grid.Column>


  <Grid.Column width={1}  >
        {props.data.active ? "☑" : "☐"}
    </Grid.Column>
  </Grid.Row>
);

SidebarRow.propTypes = {
  data: React.PropTypes.object.isRequired
};

//TODO: Connect with redux

export default SidebarRow;