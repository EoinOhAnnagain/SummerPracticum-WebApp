import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import mapStyles from './MapStyles';

function GoogleMap(props) {
  const [zoomLevel, setZoomLevel] = useState(13);
  const [lat, setLat] = useState(51.4934);
  const [lng, setLng] = useState(0.0098);
  const [state, setState] = useState({
    activeMarker: {},
    showingInfoWindow: false,
    text: ''
  });
  
  const onMarkerClick = (props, marker) => {
    setState({
      ...state,
      activeMarker: marker,
      showingInfoWindow: true,
      text: marker.text || ''
    });
  };

  const onInfoWindowClose = () => {
    setState({
      activeMarker: null,
      showingInfoWindow: false
    });
  }
  
  return (
    <div className='map'>
      <Map
        google={props.google}
        zoom={zoomLevel}
        styles={mapStyles}
        
        initialCenter={{
          lat,
          lng
        }}
      >
        <Marker
          position={{ lat: 51.4934, lng: 0.0098 }}
          //icon={config.googleMapsMarkerIcon}
          onClick={onMarkerClick}
          text='some text'
        />
        <InfoWindow
          marker={state.activeMarker}
          onClose={onInfoWindowClose}
          visible={state.showingInfoWindow}>
          <div>
            <p>{state.text}</p>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({ apiKey: "AIzaSyDMShWhoPlx171FYgvYn_nOroBgsf28oCk" })(GoogleMap);