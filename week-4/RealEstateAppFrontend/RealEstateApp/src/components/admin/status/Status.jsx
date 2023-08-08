import { useState } from "react";
import ListStatuses from "./ListStatuses";
import CreateStatus from "./CreateStatus";

const Status = () => {
  const [operation, setOperation] = useState("list");

  return (
    <section>
      <div className="flex flex-row">
        <div className="basis-1/4">
          <div className="block">
            <label className="block mb-2 text-sm font-medium text-white">
              Select an operation
            </label>
            <select
              className="bg-gray-800 pl-2 py-1 mb-2 text-sm font-medium rounded-lg"
              onChange={(e) => {
                setOperation(e.target.value);
              }}
            >
              <option value="list">List</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
            </select>
          </div>
        </div>
        <div className="basis-3/4">
          {operation === "list" ? (
            <ListStatuses />
          ) : operation === "create" ? (
            <CreateStatus />
          ) : operation === "update" ? (
            <div>update</div>
          ) : operation === "delete" ? (
            <div>delete</div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Status;
