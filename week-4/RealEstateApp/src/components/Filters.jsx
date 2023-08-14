import { useState, useEffect } from "react";
import { getAll } from "../services/EntityService";

export const Filters = ({ setFilters }) => {
  // const
  const [propertyType, setPropertyType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [currency, setCurrency] = useState("");
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
    let gate = false;
    if (currency !== "") {
      filters.currency = currency;
      gate = true;
    }
    if (propertyType !== "") {
      filters.type = propertyType;
      gate = true;
    }
    if (propertyStatus !== "") {
      filters.status = propertyStatus;
      gate = true;
    }
    if (gate === false) {
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
            <label>Min</label>
            <input type="range" min={0} max="100" className="range range-sm" />
          </div>
        </li>
        <li>
          <div>
            <label>Max</label>
            <input type="range" min={0} max="100" className=" range range-sm" />
            0000000
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
