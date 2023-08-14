import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { DetailMap } from "./map/DetailMap";
import { defaultLatitude, defaultLongitude } from "../helpers/MapData";
import { getAllProperties } from "../services/PropertyService";

export const PropertyMap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const fetchProperties = async () => {
    const response = await getAllProperties();
    if (response && response.statusCode === 200) {
      setProperties(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="w-12 mx-auto">
          <span className="loading loading-spinner loading-lg text-accent"></span>
        </div>
      ) : (
        <div>
          <div className="mt-4 items-center">
            <DetailMap
              lat={defaultLatitude}
              long={defaultLongitude}
              size={true}
            >
              {properties.map((property) => (
                <Marker
                  key={property.id}
                  position={[property.latitude, property.longitude]}
                >
                  <Popup>
                    Price: {property.price} ({property.currency})<br /> Status:{" "}
                    {property.status}
                    <br />
                    Type: {property.type}
                    <br />
                  </Popup>
                </Marker>
              ))}
            </DetailMap>
          </div>
        </div>
      )}
    </div>
  );
};
