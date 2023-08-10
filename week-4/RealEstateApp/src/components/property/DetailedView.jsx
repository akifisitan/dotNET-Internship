import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getById } from "../../services/EntityService";
import DetailMap from "../map/DetailMap";
import { defaultLatitude, defaultLongitude } from "../../helpers/MapData";
import { getAllProperties } from "../../services/PropertyService";
import { Marker, Popup } from "react-leaflet";

const DetailedView = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [propertyType, setPropertyType] = useState(-1);
  const [propertyStatus, setPropertyStatus] = useState(-1);
  const [currency, setCurrency] = useState(-1);
  const [price, setPrice] = useState(-1);
  const [photos, setPhotos] = useState([]);
  const [latitude, setLatitude] = useState(defaultLatitude);
  const [longitude, setLongitude] = useState(defaultLongitude);
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchProperty = async () => {
    setIsLoading(true);
    const response = await getById(
      "Property/getById",
      location.state.propertyId
    );
    if (response && response.statusCode === 200) {
      setStartDate(response.data.startDate);
      setEndDate(response.data.endDate);
      setCurrency(response.data.currency.value);
      setPrice(response.data.price);
      setPropertyStatus(response.data.propertyStatus.value);
      setPropertyType(response.data.propertyType.value);
      setPhotos(response.data.propertyImages);
      setLatitude(response.data.latitude);
      setLongitude(response.data.longitude);
    }
  };

  const fetchProperties = async () => {
    const response = await getAllProperties();
    if (response && response.statusCode === 200) {
      setProperties(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!location.state) {
      navigate("/", { replace: true });
    } else {
      fetchProperty();
      fetchProperties();
    }
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="w-12 mx-auto">
          <span className="loading loading-spinner loading-lg text-accent"></span>
        </div>
      ) : (
        <div>
          <div className="flex flex-row">
            <div className="basis-1/2 ml-4">
              <p>
                Listing Date Range: {startDate} - {endDate}
              </p>
              <p>Property Type: {propertyType}</p>
              <p>Property Status: {propertyStatus}</p>
              <p>
                Price: {price} {`(${currency})`}
              </p>
            </div>
            <div className="basis-1/2 mr-4">
              <h1 className="pl-4">Gallery</h1>
              <div className="carousel carousel-end mt-2">
                {photos.map((photo) => (
                  <div className="carousel-item" key={photo.id}>
                    <img
                      className="block w-96 h-96"
                      src={`data:image/jpeg;base64,${photo.value}`}
                      alt={photo.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 items-center">
            <h1 className="text-center">Map Information</h1>
            <DetailMap lat={latitude} long={longitude}>
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

export default DetailedView;
