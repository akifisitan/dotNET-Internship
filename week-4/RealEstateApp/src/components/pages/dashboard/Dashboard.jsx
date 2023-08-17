import { useNavigate } from "react-router-dom";
import { ListProperties } from "./user/ListProperties";
import { Analytics } from "./Analytics";

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="p-2">
        <h2 className="text-xl inline-block mr-2 align-middle">Properties</h2>
        <button
          onClick={() => navigate("/createProperty")}
          className="btn btn-accent btn-sm inline-block align-middle"
        >
          Create New
        </button>
      </div>
      <div>
        <ListProperties />
      </div>
      <div className="mx-auto">
        <Analytics />
      </div>
    </div>
  );
};
