import ViewProperty from "./ViewProperty";
import ListProperties from "./ListProperties";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProperties = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to your properties</h1>
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
