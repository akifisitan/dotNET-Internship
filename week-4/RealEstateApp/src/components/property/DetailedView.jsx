import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getById } from "../../services/EntityService";

const DetailedView = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [propertyType, setPropertyType] = useState(-1);
  const [propertyStatus, setPropertyStatus] = useState(-1);
  const [currency, setCurrency] = useState(-1);
  const [price, setPrice] = useState(-1);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!location.state) {
      navigate("/", { replace: true });
    } else {
      fetchProperty();
    }
  }, []);

  return (
    <div className="p-2">
      {isLoading ? (
        <span className="loading loading-spinner loading-lg text-accent"></span>
      ) : (
        <div>
          <div>
            <p>Start Date: {startDate}</p>
            <p>End Date: {endDate}</p>
            <p>Property Type: {propertyType}</p>
            <p>Property Status: {propertyStatus}</p>
            <p>Currency: {currency}</p>
            <p>Price: {price}</p>
          </div>
          <div>
            {photos.map((photo) => (
              <img
                className="block w-64 h-48"
                key={photo.id}
                src={`data:image/jpeg;base64,${photo.value}`}
                alt={photo.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedView;
