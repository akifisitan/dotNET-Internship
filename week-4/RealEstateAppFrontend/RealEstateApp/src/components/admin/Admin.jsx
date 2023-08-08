import { useState } from "react";
import Status from "./status/Status";

const Admin = () => {
  const [category, setCategory] = useState("status");

  return (
    <div className="p-2">
      <div>
        <h1>Admin Panel</h1>
        <label className="block mb-2 text-sm font-medium text-white">
          Select category
        </label>
        <select
          className="bg-gray-800 pl-2 py-1 mb-2 text-sm font-medium rounded-lg"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="status">Status</option>
          <option value="currency">Currency</option>
          <option value="type">Type</option>
        </select>
      </div>
      <div>
        {category === "status" ? (
          <Status />
        ) : category === "currency" ? (
          <h1>Location</h1>
        ) : category === "type" ? (
          <h1>Type</h1>
        ) : (
          <div>Error</div>
        )}
      </div>
    </div>
  );
};

export default Admin;
