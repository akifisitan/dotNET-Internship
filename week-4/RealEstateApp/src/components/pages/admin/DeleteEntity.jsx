import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEntity } from "../../../services/EntityService";

export const DeleteEntity = ({ entityData }) => {
  const [dataId, setDataId] = useState();
  const [info, setInfo] = useState(null);
  const [outcome, setOutcome] = useState("error");
  const [dismissing, setDismissing] = useState(false);
  const navigate = useNavigate();
  const { name, path } = entityData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dismissing) return;
    console.log("Dismissing: ", dismissing);
    if (outcome === "success") setOutcome("error");
    setInfo(null);
    const response = await deleteEntity(path, dataId);
    if (!response) {
      setInfo(
        "We're sorry, but we couldn't process your request at the moment. Please try again later."
      );
    } else {
      const statusCode = response.statusCode;
      switch (statusCode) {
        case 204:
          setInfo(`${name} deleted successfully`);
          setOutcome("success");
          break;
        case 400:
          setInfo("Please enter a valid id");
          break;
        case 401:
          navigate("/logout");
          break;
        case 403:
          setInfo("You do not have permission perform to this action");
          break;
        case 404:
          setInfo(`No ${name.toLowerCase()} found with this id`);
          break;
        default:
          setInfo(
            `An unhandled situation ocurred, server response status code: ${statusCode}`
          );
          break;
      }
    }
    setDismissing(true);
    setTimeout(() => {
      setInfo(null);
      setDismissing(false);
    }, 1500);
  };

  return (
    <section className="flex flex-col">
      <h2 className="mb-2 text-xl">Delete {name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            {name} Id
          </label>
          <input
            type="number"
            required
            min={1}
            className="bg-gray-800 pl-2 py-1 mb-2 text-sm font-medium rounded-lg"
            placeholder={`Enter ${name.toLowerCase()} id`}
            onChange={(e) => setDataId(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-red-700 hover:bg-primary-700  text-gray-100  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 my-2 text-center"
        >
          Delete
        </button>

        <div>
          {info !== null ? (
            <div className="toast toast-end">
              <div className={`alert alert-${outcome}`}>
                <span>{info}</span>
              </div>
            </div>
          ) : null}
        </div>
      </form>
    </section>
  );
};
