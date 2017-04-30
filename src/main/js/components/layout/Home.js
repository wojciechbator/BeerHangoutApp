import React, {Component} from "react";
import {Grid} from "semantic-ui-react";
import {connect} from 'react-redux';

import HangoutsMap from "../presentation/HangoutsMap";
import {CommentsContainer} from "../containers";
import Navbar from "../presentation/Navbar";
import Sidebar from "../containers/Sidebar";
import {transitionToLogin} from '../../redux/authentication/authActions';


require('../../../../../node_modules/semantic-ui/dist/components/grid.min.css');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: this.props.signedIn
    }
  }
  componentWillMount() {
    console.log(this.state.signedIn);
    !this.props.signedIn ? this.props.dispatch(transitionToLogin()) : '';
  }

  render() {
    return (
      <div>
        <Navbar/>
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <HangoutsMap />
              <Sidebar />
            </ Grid.Column>
            <Grid.Column width={4}>
              <CommentsContainer />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  signedIn: React.PropTypes.boolean
};

const mapStateToProps = (store) => {
  return {
    signedIn: store.auth.signedIn
  }
};

export default connect(mapStateToProps)(Home);
