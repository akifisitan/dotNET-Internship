import { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { DetailMap } from "../../reusable/map/DetailMap";
import { defaultLatitude, defaultLongitude } from "../../../helpers/MapData";
import { getAllMapData } from "../../../services/PropertyService";

export const PropertyMap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState(null);

  const fetchProperties = async () => {
    const response = await getAllMapData();
    if (response && response.statusCode === 200) {
      setProperties(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <section>
      {isLoading ? (
        <div className="flex">
          <span className="loading loading-spinner loading-lg text-accent mx-auto my-36"></span>
        </div>
      ) : !properties ? (
        <div className="flex">
          <div className="my-36 mx-auto">
            <p>Could not get map data, please try again later</p>
          </div>
        </div>
      ) : (
        <div className="mt-4 items-center">
          <DetailMap lat={defaultLatitude} long={defaultLongitude} size={true}>
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
      )}
    </section>
  );
};
