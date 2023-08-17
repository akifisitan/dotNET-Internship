import { useEffect, useMemo, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, useMap, TileLayer } from "react-leaflet";

export const SelectMap = ({ lat, long, setLat, setLong }) => {
  function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
  }
  useEffect(() => {
    setLat(lat);
    setLong(long);
  }, [lat, long, setLat, setLong]);

  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          setLat(lat);
          setLong(lng);
        }
      },
    }),
    []
  );

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
      <Marker
        position={[lat, long]}
        draggable={"true"}
        ref={markerRef}
        eventHandlers={eventHandlers}
      >
        <SetViewOnClick coords={[lat, long]} />
      </Marker>
    </MapContainer>
  );
};
