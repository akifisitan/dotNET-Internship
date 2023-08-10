import { useState, useEffect } from "react";
import { getAll } from "../services/EntityService";

const Filters = ({ setFilters }) => {
  const [propertyType, setPropertyType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [currency, setCurrency] = useState("");
  const [price, setPrice] = useState(50000);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyStatuses, setPropertyStatuses] = useState([]);
  const [currencies, setCurrencies] = useState([]);

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

  const filterData = () => {
    const filters = {};
    filters.price = price;
    filters.currency = currency;
    filters.propertyType = propertyType;
    filters.propertyStatus = propertyStatus;
    if (filters.price === 0) {
      setFilters(null);
    } else {
      setFilters(filters);
    }
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
    <div className="flex flex-row">
      <ul className="menu bg-base-200 rounded-box">
        <h2 className="text-center text-lg">Filters</h2>
        <li>
          <div>
            <label className="label">Price</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="range"
              step={1000}
              value={price}
              min={0}
              max="99999"
              className="range range-sm"
            />
            {price}
          </div>
        </li>
        <li>
          <div>
            <label className="label">Currency</label>
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              onChange={(e) => {
                console.log(`Chosen currency id: ${e.target.value}`);
                setCurrency(e.target.value);
              }}
            >
              <option value="">Any</option>
              {currencies.map((data) => (
                <option key={data.id} value={data.value}>
                  {data.value}
                </option>
              ))}
            </select>
          </div>
        </li>
        <li>
          <div>
            <label className="label">Type</label>
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              onChange={(e) => {
                console.log(`Chosen type id: ${e.target.value}`);
                setPropertyType(e.target.value);
              }}
            >
              <option value="">Any</option>
              {propertyTypes.map((data) => (
                <option key={data.id} value={data.value}>
                  {data.value}
                </option>
              ))}
            </select>
          </div>
        </li>
        <li>
          <div>
            <label className="label">Status</label>
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              onChange={(e) => {
                console.log(`Chosen status id: ${e.target.value}`);
                setPropertyStatus(e.target.value);
              }}
            >
              <option value="">Any</option>
              {propertyStatuses.map((data) => (
                <option key={data.id} value={data.value}>
                  {data.value}
                </option>
              ))}
            </select>
          </div>
        </li>
        <li>
          <div className="flex">
            <button
              className="btn btn-primary min-w-full mx-auto"
              onClick={filterData}
            >
              Filter
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Filters;
