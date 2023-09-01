import { useState, useEffect } from "react";
import {
  getAll,
  getById,
  deleteEntity,
} from "../../../../services/EntityService";
import { updateProperty } from "../../../../services/PropertyService";
import { useNavigate, useLocation } from "react-router-dom";
import { SelectMap } from "../../../reusable/map/SelectMap";
import { defaultLatitude, defaultLongitude } from "../../../../helpers/MapData";

export const EditProperty = () => {
  const [endDate, setEndDate] = useState("");
  const [propertyTypeId, setPropertyTypeId] = useState(-1);
  const [propertyStatusId, setPropertyStatusId] = useState(-1);
  const [currencyId, setCurrencyId] = useState(-1);
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [info, setInfo] = useState(null);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyStatuses, setPropertyStatuses] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [lat, setLat] = useState(defaultLatitude);
  const [long, setLong] = useState(defaultLongitude);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setInfo("Please fill all the fields.");
      return;
    }
    const data = {
      id: location.state.propertyId,
      endDate: endDate,
      typeId: propertyTypeId,
      statusId: propertyStatusId,
      currencyId: currencyId,
      price: price,
      latitude: lat.toFixed(2),
      longitude: long.toFixed(2),
    };
    console.log(data.id);
    const response = await updateProperty(data);
    if (!response) {
      setInfo("Something went wrong. Please try again later.");
    } else {
      const statusCode = response.statusCode;
      switch (statusCode) {
        case 204:
          navigate("/dashboard", { replace: true });
          break;
        case 400:
          setInfo(response.data.message);
          break;
        case 401:
          navigate("/logout");
          break;
        case 403:
          setInfo("You are not authorized to perform this action.");
          break;
      }
    }
    console.log(response);
  };

  const validate = () => {
    if (
      endDate === "" ||
      propertyTypeId === -1 ||
      propertyStatusId === -1 ||
      currencyId === -1 ||
      price === 0 ||
      images.length === 0
    ) {
      return false;
    }
    return true;
  };

  const fetchData = async () => {
    await fetchProperty();
    await fetchCurrencies();
    await fetchPropertyStatuses();
    await fetchPropertyTypes();
  };

  const fetchProperty = async () => {
    const response = await getById(
      "Property/getById",
      location.state.propertyId
    );
    console.log("Fetch property response:");
    console.log(response);
    if (response && response.statusCode === 200) {
      setEndDate(response.data.endDate);
      setPrice(response.data.price);
      setPropertyStatusId(response.data.status.id);
      setPropertyTypeId(response.data.type.id);
      setCurrencyId(response.data.currency.id);
      setLat(response.data.latitude);
      setLong(response.data.longitude);
      setImages(response.data.images);
    }
  };

  const handleDelete = async () => {
    const response = await deleteEntity("Property", location.state.propertyId);
    if (!response) {
      setInfo(
        "We're sorry, but we couldn't process your request at the moment. Please try again later."
      );
    } else {
      const statusCode = response.statusCode;
      switch (statusCode) {
        case 204:
          navigate("/dashboard", { replace: true });
          break;
        case 401:
          navigate("/logout", { replace: true });
          break;
        case 403:
          setInfo("You do not have permission perform to this action");
          break;
        default:
          setInfo(
            `An unhandled situation ocurred, server response status code: ${statusCode}`
          );
          break;
      }
    }
  };

  const fetchCurrencies = async () => {
    const response = await getAll("Currency");
    if (response && response.statusCode === 200) setCurrencies(response.data);
  };

  const fetchPropertyStatuses = async () => {
    const response = await getAll("PropertyStatus");
    if (response && response.statusCode === 200)
      setPropertyStatuses(response.data);
  };

  const fetchPropertyTypes = async () => {
    const response = await getAll("PropertyType");
    if (response && response.statusCode === 200)
      setPropertyTypes(response.data);
  };

  useEffect(() => {
    console.log(location.state);
    if (!location.state) {
      navigate("/dashboard");
    } else {
      fetchData();
    }
  }, []);

  return (
    <section className="flex flex-row">
      <div className="basis-1/3">
        <form
          onSubmit={handleSubmit}
          className="form-control w-full max-w-xs mx-auto"
        >
          <div>
            <label className="label">Edit End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input input-bordered input-sm inline-block"
            />
          </div>
          <div>
            <label className="label">Edit Property Type</label>
            <select
              value={propertyTypeId}
              className="select select-bordered select-sm w-full max-w-xs"
              onChange={(e) => {
                console.log(`Chosen property type id: ${e.target.value}`);
                setPropertyTypeId(e.target.value);
              }}
            >
              <option disabled>Select a property type</option>
              {propertyTypes.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Edit Property Status</label>
            <select
              value={propertyStatusId}
              className="select select-bordered select-sm w-full max-w-xs"
              onChange={(e) => {
                console.log(`Chosen property status id: ${e.target.value}`);
                setPropertyStatusId(e.target.value);
              }}
            >
              <option disabled>Select a property status</option>
              {propertyStatuses.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Edit Currency</label>
            <select
              value={currencyId}
              className="select select-bordered select-sm w-full max-w-xs"
              onChange={(e) => {
                console.log(`Chosen currency id: ${e.target.value}`);
                setCurrencyId(e.target.value);
              }}
            >
              <option disabled>Select a currency</option>
              {currencies.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Edit Price</label>
            <input
              type="number"
              required
              min={1000}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              title="This field is required"
              className="input input-bordered input-sm"
              placeholder="Enter price"
            />
          </div>
          <button type="submit" className="btn btn-accent p-2 mt-2">
            Edit Property
          </button>
          <button onClick={handleDelete} className="btn btn-error p-2 mt-2">
            Delete Property
          </button>
          <div>
            <p className="text-xs text-red-500">{info}</p>
          </div>
        </form>
      </div>
      <div className="basis-1/3">
        <div className="mx-auto mr-4">
          <h1>Property Photos</h1>
          {images.map((image) => (
            <img
              key={image.id}
              className="mt-4 mb-4 w-96 h-48"
              src={image.value}
              alt="property"
            />
          ))}
        </div>
      </div>
      <div className="basis-1/3">
        <div className="mx-auto mr-4">
          <h1>Current location</h1>
          <SelectMap lat={lat} long={long} setLat={setLat} setLong={setLong} />
        </div>
      </div>
    </section>
  );
};
