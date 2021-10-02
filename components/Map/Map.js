import GoogleMapReact from "google-map-react";
import React from "react";
import PropTypes from "prop-types";
import markerSvg from "../../public/images/google_maps_mark.svg";

const { NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } = process.env;

export default function Map({ lat, lng }) {
  Map.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  };

  console.log(lat, lng);

  return (
    <div style={{ height: "400px", width: "400px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat, lng }}
        defaultZoom={11}
      >
        <img
          src={markerSvg}
          lat={lat}
          lng={lng}
          text="My Marker"
          alt="marker"
        ></img>
      </GoogleMapReact>
    </div>
  );
}
