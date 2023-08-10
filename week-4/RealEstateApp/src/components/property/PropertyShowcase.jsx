import { useState, useEffect } from "react";
import { getAllProperties } from "../../services/PropertyService";
import ShowcaseTable from "./ShowcaseTable";
import { useNavigate } from "react-router-dom";

const PropertyShowcase = ({ filters }) => {
  const [{ isLoading, data, error }, setState] = useState({
    isLoading: false,
    data: [],
    error: null,
  });
  const [filteredData, setFilteredData] = useState([]);
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
    if (!filters) {
      setState({
        error: null,
        isLoading: true,
      });
      fetchData();
    } else {
      console.log("Filtering data...");
      console.log(filters);
      const newData = data.filter((item) => {
        for (const key in filters) {
          if (filters[key] && item[key] !== filters[key]) {
            return false;
          }
        }
        return true;
      });
      setFilteredData(newData);
      console.log(data);
    }
    console.log(data);
  }, [filters]);

  return (
    <div>
      <div className="flex p-2">
        {!isLoading ? (
          error ? (
            <p>{error}</p>
          ) : (
            <ShowcaseTable
              data={
                filteredData && filteredData.length != 0 ? filteredData : data
              }
            />
          )
        ) : (
          <div className="w-12 mx-auto">
            <span className="loading loading-spinner loading-lg text-accent"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyShowcase;
