import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useMemo } from "react";

const center = [51.505, -0.09];
const zoom = 13;

export default function Map() {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(() => map.getCenter());


  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} draggable={true}>
          <Popup>
            Omu-Aran the Head Post of Igbomina land, is a town in the Nigerian
            state of Kwara. It originated from Ife and currently the local
            government headquarters of Irepodun local government.
          </Popup>
        </Marker>
      </MapContainer>
    ),
    []
  );

  return (
    <div>
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </div>
  );
}
