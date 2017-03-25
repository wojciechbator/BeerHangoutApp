import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
 
const markerPosition = [51.10, 17.03];

export default class HangoutsMap extends Component {
                
// onLocationFound = (event) => {
//   var radius = event.accuracy;
//   L.marker(event.latlng).addTo(Map)
//       .bindPopup("Jesteś w promieniu " + radius + " metrów od markera.").openPopup();
//   L.circle(event.latlng, radius).addTo(Map);
//   Map.center = event.latlng;
// }

//   componentDidMount() {
//     this.onLocationFound();
//   }

  render() {
    return (
      <Map center={markerPosition} zoom={13} style={{position:"fixed"}}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={markerPosition}>
          <Popup>
            <span>Wrocław<br/>Będzie się działo.</span>
          </Popup>
        </Marker>
      </Map>
    )
  }
}