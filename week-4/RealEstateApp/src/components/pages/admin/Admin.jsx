import { useState } from "react";
import { Entity } from "./Entity";

export const Admin = () => {
  const [category, setCategory] = useState("currency");
  const statusData = { name: "Property Status", path: "PropertyStatus" };
  const typeData = { name: "Property Type", path: "PropertyType" };
  const currencyData = { name: "Currency", path: "Currency" };

  return (
    <div className="p-2">
      <div>
        <h1 className="text-lg mb-6">Admin Panel</h1>
        <label className="block mb-2 text-sm font-medium text-white">
          Select entity
        </label>
        <select
          className="bg-gray-800 pl-2 py-1 mb-2 text-sm font-medium rounded-lg"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="currency">Currency</option>
          <option value="status">Property Status</option>
          <option value="type">Property Type</option>
        </select>
      </div>
      <div>
        {category === "status" ? (
          <Entity entityData={statusData} />
        ) : category === "currency" ? (
          <Entity entityData={currencyData} />
        ) : category === "type" ? (
          <Entity entityData={typeData} />
        ) : (
          <div>Error</div>
        )}
      </div>
    </div>
  );
};
