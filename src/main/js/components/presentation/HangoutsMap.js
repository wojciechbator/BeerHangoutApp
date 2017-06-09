import React, {Component} from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {refreshVenuesByLocation} from "../../redux/venues/venuesActions"
import {connect} from "react-redux";
import SingleVenue from "./SingleVenue";
import {Button} from 'semantic-ui-react';

class HangoutsMap extends Component {
  state = {
    hasLocation: false,
    latlng: Map.latlng,

  };

    handleLocationFound = (e) => {
        this.setState({
            hasLocation: true,
            latlng: e.latlng,
            venues: this.props.venues,
        });
        this.props.dispatch(refreshVenuesByLocation(this.state.latlng.lat+","+this.state.latlng.lng));

    };
  componentDidMount() {


    this.refs.map.leafletElement.locate();
      this.setState({
          venues: this.props.venues
      })

  }


  render() {
      console.log(this.props.venues);

    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>

        <Popup>
          <span>{this.state.venues.lat}</span>

        </Popup>
      </Marker>
    ) : null;

    return (

      <Map
        center={this.state.latlng}
        zoom={13}
        style={{position: "fixed"}}
        // onClick={this.handleClick}
        onLocationfound={this.handleLocationFound}
        ref='map'
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
          {marker}
          <ul >

              {this.props.venues.map((venue, i) => {

                  return (
                      <li key={i}>
                        <Marker position={{lat:venue.location.lat, lng:venue.location.lng}}/>
                      </li>
                  );
              })}
          </ul>


      </Map>

    )

  }

};

HangoutsMap.PropTypes = {
    venues: React.PropTypes.array,
    comments: React.PropTypes.array


};

HangoutsMap.defaultProps = {
    venues: [],
    comments: [],
};

const mapStateToProps = (store) => {
    return {
        venues: store.venues.data,
    };
    }
export default connect(mapStateToProps)(HangoutsMap);
