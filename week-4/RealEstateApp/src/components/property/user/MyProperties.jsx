import ListProperties from "./ListProperties";
import { useNavigate } from "react-router-dom";

const MyProperties = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate("/createProperty")}
        className="btn btn-primary btn-md"
      >
        Create
      </button>
      <ListProperties />
    </div>
  );
};

export default MyProperties;
