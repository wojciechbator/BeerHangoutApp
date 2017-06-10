import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { doGetCurrentPosition } from "../../redux/map/map";
import { refreshVenuesByLocation,refreshVenuesByCity } from "../../redux/venues/venuesActions";
import { connect } from "react-redux";

class HangoutsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLocation: false,
      latlng: Map.latlng,
      venues: []
    };
  }


  handleLocationFound = (e) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
      venues: this.props.venues,
    });
      this.props.dispatch(doGetCurrentPosition(this.state.latlng));
    //  this.props.dispatch(refreshVenuesByLocation(this.state.latlng.lat + "," + this.state.latlng.lng));
      this.props.dispatch(refreshVenuesByLocation(this.state.latlng.lat+","+this.state.latlng.lng));
      console.log("POZYCJA" + this.state.latlng+ this.state.latlng.lat+","+this.state.latlng.lng);



  };
  componentDidMount() {
    this.refs.map.leafletElement.locate();
    this.setState({
      venues: this.props.venues
    });
  }


  render() {

    const marker = this.state.hasLocation ? (
      <Marker  opacity={0.35}   position={this.state.latlng} >

        <Popup  >
          <div >
            <div>Tutaj jesteś</div>
          </div>

        </Popup>
      </Marker>
    ) : null;

    return (

      <Map
        center={this.state.latlng}
        zoom={13}
        style={{ position: "fixed" }}
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
                <Marker position={{ lat: venue.location.lat, lng: venue.location.lng }}>
                  <Popup>
                    <div>
                      <div>{venue.name}</div>
                      <div>{venue.city}</div>
                      <div>Ilość odwiedzin: {venue.stats.checkinsCount}</div>
                    </div>
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
    // latlng: store.ourLocation.latlng
  };
}
export default connect(mapStateToProps)(HangoutsMap);
