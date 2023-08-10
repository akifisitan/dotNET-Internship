import { Marker, Popup } from "react-leaflet";

const MapMarker = ({ property }) => {
  <Marker position={[property.latitude, property.longitude]}>
    <Popup>{property.price}</Popup>
  </Marker>;
};

export default MapMarker;
