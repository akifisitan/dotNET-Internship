import { useState, useEffect } from "react";
import { getAll } from "../../../services/EntityService";

export const Filters = ({ setCurrentPage, setFilters }) => {
  const [typeId, setTypeId] = useState("-1");
  const [statusId, setStatusId] = useState("-1");
  const [currencyId, setCurrencyId] = useState("-1");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
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
    if (currencyId !== "-1") {
      filters.currencyId = currencyId;
    }
    if (typeId !== "-1") {
      filters.typeId = typeId;
    }
    if (statusId !== "-1") {
      filters.statusId = statusId;
    }
    if (minPrice !== "" && minPrice !== "0") {
      filters.minPrice = minPrice;
    }
    if (maxPrice !== "" && maxPrice !== "9999999") {
      filters.maxPrice = maxPrice;
    }
    setCurrentPage(1);
    setFilters(filters);
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
      <ul className="menu bg-base-200 rounded-box mx-auto">
        <h2 className="text-center text-lg">Filters</h2>
        <li>
          <div>
            <label className="label">Min</label>
            <input
              type="number"
              defaultValue={0}
              min={0}
              max={9999999}
              onChange={(e) => setMinPrice(e.target.value)}
              className="input input-bordered input-sm w-full max-w-xs"
            />
          </div>
        </li>
        <li>
          <div>
            <label className="label">Max</label>
            <input
              type="number"
              defaultValue={9999999}
              min={0}
              max={9999999}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="input input-bordered input-sm w-full max-w-xs"
            />
          </div>
        </li>
        <li>
          <div>
            <label className="label">Currency</label>
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              onChange={(e) => {
                setCurrencyId(e.target.value);
              }}
            >
              <option value={"-1"}>Any</option>
              {currencies.map((data) => (
                <option key={data.id} value={data.id}>
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
                setTypeId(e.target.value);
              }}
            >
              <option value={"-1"}>Any</option>
              {propertyTypes.map((data) => (
                <option key={data.id} value={data.id}>
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
                setStatusId(e.target.value);
              }}
            >
              <option value={"-1"}>Any</option>
              {propertyStatuses.map((data) => (
                <option key={data.id} value={data.id}>
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
