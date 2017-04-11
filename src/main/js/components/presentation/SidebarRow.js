import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';

import styles from '../styles/styles';
/**
 * Created by wojciech on 11.04.17.
 */

export default class SidebarRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Grid.Row verticalAlign="middle" style={styles.comment.commentsList}>
        <Grid.Column width={3}>
          {this.props.data.username}
        </Grid.Column>
        <Grid.Column width={3}>
          {this.props.data.lastName}
        </Grid.Column>
        <Grid.Column width={1}>
          {this.props.data.is_active ? "aktywny" : "nie aktywny"}
        </Grid.Column>
      </Grid.Row>
    )
  }
}
SidebarRow.propTypes = {
  data: React.PropTypes.object.isRequired
};