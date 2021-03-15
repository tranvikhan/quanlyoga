import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";
import demoFancyMapStyles from "../constants/demoFancyMapStyles.json";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCPBLFttDXij_cQNVVi8K29YIe4Mu1mgXY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultOptions={{ styles: demoFancyMapStyles }}
    defaultZoom={13}
    center={
      props.points[0]
        ? { lat: props.points[0].Lat, lng: props.points[0].Lng }
        : { lat: 9.653502, lng: 105.54016 }
    }
    defaultCenter={
      props.points[0]
        ? { lat: props.points[0].Lat, lng: props.points[0].Lng }
        : { lat: 9.653502, lng: 105.54016 }
    }
  >
    {props.isMarkerShown &&
      props.points.length > 0 &&
      props.points.map((point, index) => (
        <Marker
          key={index}
          position={{ lat: point.Lat, lng: point.Lng }}
          onClick={props.onMarkerClick}
        />
      ))}
    <Polyline
      path={props.points.map((point) => ({ lat: point.Lat, lng: point.Lng }))}
    />
  </GoogleMap>
));

export default MyMapComponent;
