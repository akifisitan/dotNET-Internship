import { useState, useEffect } from "react";
import { getAll } from "../services/EntityService";
import { createNewProperty } from "../services/PropertyService";

const CreateProperty = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [propertyTypeId, setPropertyTypeId] = useState();
  const [propertyStatusId, setPropertyStatusId] = useState();
  const [currencyId, setCurrencyId] = useState();
  const [price, setPrice] = useState();
  const [photos, setPhotos] = useState();
  const [info, setInfo] = useState(null);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyStatuses, setPropertyStatuses] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(photos[0]);
    console.log(price);
    console.log(currencyId);
    console.log(propertyTypeId);
    console.log(propertyStatusId);
    const data = {
      StartDate: startDate,
      EndDate: endDate,
      PropertyTypeId: propertyTypeId,
      PropertyStatusId: propertyStatusId,
      CurrencyId: currencyId,
      Price: price,
      Photos: photos,
    };
    const response = await createNewProperty(data);
  };

  const fetchCurrencies = async () => {
    const response = await getAll("Currency");
    if (response && response.status === 200) setCurrencies(response.data);
  };

  const fetchPropertyStatuses = async () => {
    const response = await getAll("PropertyStatus");
    if (response && response.status === 200) setPropertyStatuses(response.data);
  };

  const fetchPropertyTypes = async () => {
    const response = await getAll("PropertyType");
    if (response && response.status === 200) setPropertyTypes(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCurrencies();
      await fetchPropertyStatuses();
      await fetchPropertyTypes();
    };
    fetchData();
  }, []);

  return (
    <section className="p-4">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-control w-full max-w-xs">
          <div>
            <label className="label">Listing Start Date</label>
            <input
              type="text"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input input-bordered input-sm"
              placeholder="01/01/2023"
              pattern="^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$"
              title="dd/mm/yyyy eg. (31/12/2023)"
            />
          </div>
          <div>
            <label className="label">Listing End Date</label>
            <input
              type="text"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input input-bordered input-sm"
              placeholder="31/12/2023"
              pattern="^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$"
              title="dd/mm/yyyy eg. (31/12/2023)"
            />
          </div>
          <div>
            <label className="label">Property Type</label>
            <select
              defaultValue="Select a property type"
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
              defaultValue="Select a property status"
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
              defaultValue="Select a currency"
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
              inputMode="numeric"
              step={100}
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
              onChange={(e) => {
                setPhotos(e.target.files);
                console.log(e.target.files);
              }}
              className="file-input file-input-bordered file-input-sm w-full max-w-xs"
            />
          </div>
          <button type="submit" className="btn btn-accent p-2 mt-2">
            Create Property
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateProperty;
