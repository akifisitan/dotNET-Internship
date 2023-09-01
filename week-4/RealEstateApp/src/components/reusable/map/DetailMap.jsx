import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

export const DetailMap = ({ lat, long, size, children }) => {
  return (
    <MapContainer
      center={[lat, long]}
      attributionControl={false}
      zoomControl={true}
      scrollWheelZoom={false}
      zoom={6}
      minZoom={5}
      maxZoom={15}
      style={{
        height: size ? "80vh" : "350px",
        position: "relative",
        outline: "none",
        maxWidth: size ? "1000px" : "696px",
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
