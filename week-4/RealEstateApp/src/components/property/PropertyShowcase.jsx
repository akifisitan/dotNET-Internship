import { useState, useEffect } from "react";
import { getAllProperties } from "../../services/PropertyService";
import ShowcaseTable from "./ShowcaseTable";
import { useNavigate } from "react-router-dom";

const PropertyShowcase = () => {
  const [{ isLoading, data, error }, setState] = useState({
    isLoading: false,
    data: [],
    error: null,
  });
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await getAllProperties();
    let data = [];
    let error = null;
    if (!response) {
      error =
        "We're sorry, but we couldn't process your request at the moment. Please try again later.";
    } else {
      const statusCode = response.statusCode;
      switch (statusCode) {
        case 200:
          data = response.data;
          break;
        case 401:
          navigate("/logout", { replace: true });
          break;
        case 403:
          error = "You do not have permission perform to this action.";
          break;
        case 404:
          error = "The requested resource was not found.";
          break;
        default:
          error = `An unhandled situation ocurred, server response status code: ${statusCode}.`;
          break;
      }
    }
    setState({
      data: data,
      isLoading: false,
      error: error,
    });
  };

  useEffect(() => {
    setState({
      error: null,
      isLoading: true,
    });
    fetchData();
  }, []);

  return (
    <div>
      <div className="p-2">
        {!isLoading ? (
          error ? (
            <p>{error}</p>
          ) : (
            <ShowcaseTable data={data} />
          )
        ) : (
          <span className="loading loading-spinner loading-lg text-accent"></span>
        )}
      </div>

      <div className="join">
        <button className="join-item btn">1</button>
        <button className="join-item btn btn-active">2</button>
        <button className="join-item btn">3</button>
        <button className="join-item btn">4</button>
      </div>
    </div>
  );
};

export default PropertyShowcase;
