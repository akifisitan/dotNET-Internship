import { useState, useEffect } from "react";
import { getAll, getById } from "../../services/EntityService";
import { updateProperty } from "../../services/PropertyService";
import { useNavigate, useLocation } from "react-router-dom";

const EditProperty = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [propertyTypeId, setPropertyTypeId] = useState(-1);
  const [propertyStatusId, setPropertyStatusId] = useState(-1);
  const [currencyId, setCurrencyId] = useState(-1);
  const [price, setPrice] = useState(-1);
  const [photos, setPhotos] = useState([]);
  const [info, setInfo] = useState(null);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyStatuses, setPropertyStatuses] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setInfo("Please fill all the fields.");
      return;
    }
    const data = {
      startDate: startDate,
      endDate: endDate,
      propertyTypeId: propertyTypeId,
      propertyStatusId: propertyStatusId,
      currencyId: currencyId,
      price: price,
      photos: photos,
    };
    const response = await updateProperty(data);
    if (!response) {
      setInfo("Something went wrong. Please try again later.");
    } else {
      const statusCode = response.statusCode;
      switch (statusCode) {
        case 200:
          navigate("/dashboard");
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
      startDate === "" ||
      endDate === "" ||
      propertyTypeId === -1 ||
      propertyStatusId === -1 ||
      currencyId === -1 ||
      price === -1 ||
      photos.length === 0
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
    console.log("aaaa");
    console.log(response);
    if (response && response.statusCode === 200) {
      setStartDate(response.data.startDate);
      setEndDate(response.data.endDate);
      setPrice(response.data.price);
      // do something about response.data.propertyImages
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
    if (!location.state) {
      navigate("/myProperties");
    } else {
      fetchData();
    }
  }, []);

  return (
    <section className="p-4">
      <h1>Edit Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control mx-auto w-full max-w-xs text-center">
          <div>
            <label className="label">Listing Start Date</label>
            <input
              type="text"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input input-bordered input-sm"
              pattern="^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$"
              title="dd/mm/yyyy eg. (31/12/2023)"
            />
          </div>
          <div>
            <label className="label">Listing End Date</label>
            <input
              type="text"
              required
              onChange={(e) => setEndDate(e.target.value)}
              className="input input-bordered input-sm"
              value={endDate}
              pattern="^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$"
              title="dd/mm/yyyy eg. (31/12/2023)"
            />
          </div>
          <div>
            <label className="label">Property Type</label>
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
            <label className="label">Property Status</label>
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
            <label className="label">Currency</label>
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
            <label className="label">Price</label>
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
          <div>
            <label className="label">Property Images</label>
            <input
              type="file"
              multiple={true}
              accept=".jpg, .jpeg, .png"
              className="file-input file-input-bordered file-input-sm w-full max-w-xs"
              onChange={(e) => {
                console.log("Setting files");
                console.log(e.target.files);
                setPhotos(e.target.files);
              }}
            />
          </div>
          <button type="submit" className="btn btn-accent p-2 mt-2">
            Create Property
          </button>
          <div>
            <p className="text-xs text-red-500">{info}</p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EditProperty;
