import { useEffect, useState } from "react";
import { getAll } from "../../../services/GenericService";

const ListStatuses = () => {
  const [{ isLoading, data, error }, setState] = useState({
    isLoading: false,
    data: [],
    error: null,
  });

  const fetchData = async () => {
    const response = await getAll("PropertyStatus");
    let data = [];
    let error = null;
    if (!response) {
      error = "An error occurred when reaching the server.";
    } else if (response.statusCode === 200) {
      data = response.data;
    } else if (response.statusCode === 403) {
      error = "Forbidden";
    } else {
      error = `Temporary: ${response.statusCode}`;
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
