import React, {Component} from "react";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";

export default class HangoutsMap extends Component {
  state = {
    hasLocation: false,
    latlng: Map.latLng
  };

  componentDidMount() {
    this.refs.map.leafletElement.locate();
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
      </Map>
    )
  }
}