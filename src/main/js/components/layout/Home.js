import React, {Component} from "react";
import {Grid} from "semantic-ui-react";
import DocumentTitle from 'react-document-title';

import HangoutsMap from "../presentation/HangoutsMap";
import {CommentsContainer} from "../containers";
import Navbar from "../presentation/Navbar";
import Sidebar from "../containers/Sidebar";


require('../../../../../node_modules/semantic-ui/dist/components/grid.min.css');

class Home extends Component {
  render() {
    return (
      <DocumentTitle title={`strona domowa`}>
        <Navbar/>
        <Grid columns='equal'>
          <Grid.Row >
            <Grid.Column>
              <HangoutsMap />
              <Sidebar/>
            </Grid.Column>
            <Grid.Column width={4}>
              <CommentsContainer />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default Home;
