import { useEffect, useState } from "react";
import { getAll } from "../../../services/GenericService";
import { useNavigate } from "react-router-dom";

const ListStatuses = () => {
  const [{ isLoading, data, error }, setState] = useState({
    isLoading: false,
    data: [],
    error: null,
  });
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await getAll("PropertyStatus");
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
          error = "You are not authorized to perform this action.";
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
  }, []);

  return (
    <section className="flex flex-col">
      <div className="p-2">
        {!isLoading ? (
          error ? (
            <p>{error}</p>
          ) : (
            data.map((status) => {
              return (
                <div
                  key={status.id}
                  className="border-2 rounded-lg p-2 border-cyan-700 pl-2 m-2"
                >
                  <p>Id: {status.id}</p>
                  <p>Value: {status.value}</p>
                </div>
              );
            })
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default ListStatuses;
