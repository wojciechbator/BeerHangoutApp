import React, {Component} from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {refreshVenuesByLocation} from "../../redux/venues/venuesActions"
import {connect} from "react-redux";
import SingleVenue from "./SingleVenue";

class HangoutsMap extends Component {
  state = {
    hasLocation: false,
    latlng: Map.latlng,
  };

  componentDidMount() {
    this.refs.map.leafletElement.locate();
      this.props.dispatch(refreshVenuesByLocation(Map.latlng));
      this.setState({
          venues: this.props.venues
      })

  }

  handleLocationFound = (e) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    });
  };

  render() {

    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>

        <Popup>
          <span>Tutaj jesteś</span>

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
          {this.props.venues.map((venue, i) => {
        return(
            <li key={i}>
                <SingleVenue location={venue.location} name={venue.name} />

            </li>

        );

          })}
      </Map>
    )
  }

};
const mapStateToProps = (store) => {
    return {
        venues: store.venues.id,
    };
};
HangoutsMap.PropTypes = {
    venues: React.PropTypes.array
};

HangoutsMap.defaultProps = {
    venues: []
};
export default connect(mapStateToProps)(HangoutsMap);
