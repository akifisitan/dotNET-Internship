import { Filters } from "./Filters";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPaginated } from "../../../services/PropertyService";
import { ShowcaseTable } from "./ShowcaseTable";

export const Home = () => {
  const [filters, setFilters] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const response = await getPaginated(currentPage, filters);
    if (!response) {
      setError(
        "We're sorry, but we couldn't process your request at the moment. Please try again later."
      );
    } else {
      const statusCode = response.statusCode;
      switch (statusCode) {
        case 200:
          setMaxPage(response.data.numberOfPages);
          setData(response.data.items);
          break;
        case 401:
          navigate("/logout", { replace: true });
          break;
        case 403:
          setError("You do not have permission perform to this action.");
          break;
        case 404:
          setError("The requested resource was not found.");
          break;
        default:
          setError(
            `An unhandled situation ocurred, server response status code: ${statusCode}.`
          );
          break;
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, filters]);

  return (
    <div className="p-2">
      <h1 className="text-2xl pl-4 mb-4">Home</h1>
      <div className="flex flex-row">
        <div className="basis-1/4">
          <Filters setCurrentPage={setCurrentPage} setFilters={setFilters} />
          {loading || error ? null : (
            <div className="flex flex-row mt-2">
              <div className="join w-full justify-center items-center">
                <button
                  className="join-item btn w-1/6"
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                  }}
                  disabled={currentPage === 1}
                >
                  «
                </button>
                <button className="join-item btn w-2/5">
                  Page {currentPage} / {maxPage}
                </button>
                <button
                  className="join-item btn w-1/6"
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                  }}
                  disabled={currentPage === maxPage}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="basis-4/5">
          <div>
            <div className="flex p-2">
              {loading ? (
                <div className="w-12 mx-auto">
                  <span className="loading loading-spinner loading-lg text-accent"></span>
                </div>
              ) : error ? (
                <p>{error}</p>
              ) : data ? (
                data.length > 0 ? (
                  <ShowcaseTable data={data} />
                ) : (
                  <div>No data found matching filters</div>
                )
              ) : (
                <div>Error fetching data</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
