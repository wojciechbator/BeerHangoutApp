import React from "react";
import {Button, Grid} from "semantic-ui-react";

import {aStyle, userStyle, textStyle} from "../styles/styles";
/**
 * Created by wojciech on 11.04.17.
 */

const Venue = (props) => (
    <Grid style={userStyle.userList} >
  <Grid.Row >
    <Grid.Column width={8}>
      Nazwa miejscówki:       <br/>{props.name}<br/>
      Liczba odwiedzin: {props.visits} <br/>
      Odległość: {props.distance}m
    </Grid.Column>
<Grid.Column width={1}>
      <Button color="green"><a style={aStyle} href="http://localhost:8081">Przejdź do czatu</a></Button>
</Grid.Column>
  </Grid.Row>
    </Grid>
);

Venue.propTypes = {
  name: React.PropTypes.string,
  city: React.PropTypes.string,
  visits: React.PropTypes.number,
  address: React.PropTypes.string,
    distance: React.PropTypes.number
};

//TODO: Connect with redux

export default Venue;