import { Marker, Popup } from "react-leaflet";

export const MapMarker = ({ property }) => {
  <Marker position={[property.latitude, property.longitude]}>
    <Popup>{property.price}</Popup>
  </Marker>;
};
