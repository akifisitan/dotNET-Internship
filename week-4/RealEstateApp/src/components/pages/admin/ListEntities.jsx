import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../../services/EntityService";

export const ListEntities = ({ entityData }) => {
  const [{ isLoading, data, error }, setState] = useState({
    isLoading: false,
    data: [],
    error: null,
  });
  const { name, path } = entityData;
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await getAll(path);
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
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [name]);

  return (
    <section className="flex flex-col">
      <h1>{name} List</h1>
      <div className="p-2">
        {!isLoading ? (
          error ? (
            <p>{error}</p>
          ) : (
            data.map((entity) => {
              return (
                <div
                  key={entity.id}
                  className="border-2 rounded-lg p-2 border-cyan-700 pl-2 m-2 max-w-xs"
                >
                  <p>Id: {entity.id}</p>
                  <p>Value: {entity.value}</p>
                </div>
              );
            })
          )
        ) : (
          <span className="loading loading-spinner loading-lg text-accent"></span>
        )}
      </div>
    </section>
  );
};
