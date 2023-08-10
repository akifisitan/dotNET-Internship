import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

const DetailMap = ({ lat, long, children }) => {
  return (
    <MapContainer
      center={[lat, long]}
      attributionControl={false}
      zoomControl={false}
      zoom={5}
      style={{
        height: "350px",
        position: "relative",
        outline: "none",
        maxWidth: "696px",
        display: "block",
        margin: "15px auto",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {children}
    </MapContainer>
  );
};

export default DetailMap;
