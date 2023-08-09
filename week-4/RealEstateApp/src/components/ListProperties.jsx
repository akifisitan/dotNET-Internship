import { useState, useEffect } from "react";
import { listPropertiesByUser } from "../services/PropertyService";
import ShowcaseTable from "./ShowcaseTable";
import { useNavigate } from "react-router-dom";

const ListProperties = () => {
  const [{ isLoading, data, error }, setState] = useState({
    isLoading: false,
    data: [],
    error: null,
  });
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await listPropertiesByUser();
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
          navigate("/logout");
          break;
        case 403:
          error = "You do not have permission perform to this action.";
          break;
        case 404:
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
  const navigateToProperty = (id) => {
    console.log(id);
  };

  useEffect(() => {
    setState({
      error: null,
      isLoading: true,
    });
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      <button className="btn btn-primary" onClick={fetchData}>
        Refresh
      </button>
      <div className="p-2">
        {!isLoading ? (
          error ? (
            <p>{error}</p>
          ) : (
            <ShowcaseTable
              showcaseData={data}
              navigateToProperty={navigateToProperty}
            />
          )
        ) : (
          <span className="loading loading-spinner loading-lg text-accent"></span>
        )}
      </div>
    </div>
  );
};

export default ListProperties;
