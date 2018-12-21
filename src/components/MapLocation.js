import React from "react";
import {Map, TileLayer, Marker, Popup }  from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';


class MapLocation extends React.Component {
    constructor() {
      super()
      this.state = {
        lat: 13.68935,
        lng: -89.1871800,
        zoom: 13
      }
    }
  
    render() {
      const position = [this.state.lat, this.state.lng];
      
      return (
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br/> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      );
    }
  }
  

  export default MapLocation;