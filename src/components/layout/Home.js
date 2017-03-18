import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import HangoutsMap from '../presentation/HangoutsMap';
import { CommentsContainer } from '../containers';

require('../../../node_modules/semantic-ui/dist/components/grid.min.css');

class Home extends Component {
  render() {
    return (
      <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column>
            <HangoutsMap />
          </Grid.Column>
          <Grid.Column width={4}>
            <CommentsContainer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;
