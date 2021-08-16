import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map() {
  return (
    <div style={{ height: "400px", width: "400px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyALVjLwOIM1gf7EzdJJVmWLKdLP-yZGTcw&libraries=places" }}
        defaultCenter={{ lat: 31.989292298080994, lng: 34.90984173940237 }}
        defaultZoom={11}
      >
        <AnyReactComponent lat={31.989292298080994} lng={34.90984173940237 } text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
