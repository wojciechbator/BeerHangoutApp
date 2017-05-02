import React from 'react';
import {Grid} from 'semantic-ui-react';

import {commentStyles} from '../styles/styles';
/**
 * Created by wojciech on 11.04.17.
 */

const SidebarRow = (props) => (
  <Grid.Row verticalAlign="middle" style={commentStyles.comment.commentsList}>
    <Grid.Column width={3}>
      {props.data.username}
    </Grid.Column>
    <Grid.Column width={3}>
      {props.data.lastName}
    </Grid.Column>
    <Grid.Column width={1}>
      {props.data.is_active ? "aktywny" : "nieaktywny"}
    </Grid.Column>
  </Grid.Row>
);

SidebarRow.propTypes = {
  data: React.PropTypes.object.isRequired
};

//TODO: Connect with redux

export default SidebarRow;