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

    handleLocationFound = (e) => {
        this.setState({
            hasLocation: true,
            latlng: e.latlng,
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

    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>

        <Popup>
          <span>{this.state.latlng.lat.toString()}</span>

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
          <Marker position={{lat: 32.421,lng:32.244}}>
              <Popup>
                  <span>aaa</span>
              </Popup>

          </Marker>
        <ul>

          {this.props.venues.map((venue, i) => {
        return(
            <li key={i}>

            <Marker position={{lat: venue.lat,lng:venue.lng}}>
                <Popup>
                    <span>aaa</span>
                </Popup>

            </Marker>
           </li>

        );
          })}
        </ul>

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
