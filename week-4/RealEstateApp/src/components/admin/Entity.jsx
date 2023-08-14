import { useState } from "react";
import { ListEntities } from "./ListEntities";
import { CreateEntity } from "./CreateEntity";
import { UpdateEntity } from "./UpdateEntity";
import { DeleteEntity } from "./DeleteEntity";

export const Entity = ({ entityData }) => {
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
            <ListEntities entityData={entityData} />
          ) : operation === "create" ? (
            <CreateEntity entityData={entityData} />
          ) : operation === "update" ? (
            <UpdateEntity entityData={entityData} />
          ) : operation === "delete" ? (
            <DeleteEntity entityData={entityData} />
          ) : null}
        </div>
      </div>
    </section>
  );
};
