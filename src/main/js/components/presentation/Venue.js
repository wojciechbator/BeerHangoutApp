import React from "react";
import {Button, Grid} from "semantic-ui-react";

import {aStyle, userStyle} from "../styles/styles";
/**
 * Created by wojciech on 11.04.17.
 */


const Venue = (props) => (
  <Grid.Row style={userStyle.userList}>
    <Grid.Column width={10}>
      <div>{props.name}</div> 
      <div>{props.city}</div>
      <div>{props.visits}</div>
      <div>{props.address}</div>
      <Button color="green"><a style={aStyle} href="http://localhost:8081">Przejdź do czatu</a></Button>
    </Grid.Column>
  </Grid.Row>
);

Venue.propTypes = {
  name: React.PropTypes.string,
  city: React.PropTypes.string,
  visits: React.PropTypes.number,
  address: React.PropTypes.string
};

//TODO: Connect with redux

export default Venue;