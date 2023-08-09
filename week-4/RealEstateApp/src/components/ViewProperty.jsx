import { useState, useEffect } from "react";
import { getById } from "../services/EntityService";

const ViewProperty = ({ propertyId }) => {
  const [data, setData] = useState();
  const [property, setProperty] = useState(-1);
  const fetchData = async () => {
    const response = await getById("Property/getById", propertyId);
    if (response && response.statusCode === 200) {
      console.log(response.data);
      setData(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [property]);

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => setProperty(property + 1)}
      >
        Refresh
      </button>
      {data && data.images ? (
        <img
          style={{ width: "100px", height: "100px" }}
          src={`data:image/jpeg;base64,${data.images[0].value}`}
          alt="property"
        />
      ) : null}
      <h1>View Property {data ? data.currency.value : null}</h1>
    </div>
  );
};

export default ViewProperty;
