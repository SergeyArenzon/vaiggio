import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div style={{background: "red", height:"20px", width: "20px"}}>{text}</div>;

const { NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } = process.env;

export default function Map() {
  console.log(NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  return (
    <div style={{ height: "400px", width: "400px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}}
        defaultCenter={{ lat: 29.688986, lng: 34.875949 }}
        defaultZoom={11}
      >
        <AnyReactComponent
          lat={29.688986}
          lng={34.875949}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
