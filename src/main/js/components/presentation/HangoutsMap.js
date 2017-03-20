import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
 
const position = [51.10, 17.03];

export default class HangoutsMap extends Component {
  render() {
    return (
      <Map center={position} zoom={13} style={{position:"fixed"}}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <span>Wrocław<br/>Będzie się działo.</span>
          </Popup>
        </Marker>
      </Map>
    )
  }
}