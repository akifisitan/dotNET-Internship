import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateEntity } from "../../../services/EntityService";

export const UpdateEntity = ({ entityData }) => {
  const [data, setData] = useState();
  const [dataId, setDataId] = useState();
  const [infoMessage, setInfo] = useState(null);
  const navigate = useNavigate();
  const { name, path } = entityData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateEntity(path, {
      id: dataId,
      value: data,
    });
    if (!response) {
      setInfo(
        "We're sorry, but we couldn't process your request at the moment. Please try again later."
      );
    } else {
      const statusCode = response.statusCode;
      switch (statusCode) {
        case 200:
          setInfo(`${name} updated successfully.`);
          break;
        case 400:
          setInfo("Please check the parameters.");
          break;
        case 401:
          navigate("/logout");
          break;
        case 403:
          setInfo("You do not have permission perform to this action.");
          break;
        case 404:
          setInfo(`No ${name.toLowerCase()} found with id: ${dataId}`);
          break;
        default:
          setInfo(
            `An unhandled situation ocurred, server response status code: ${statusCode}.`
          );
          break;
      }
    }
    setTimeout(() => {
      setInfo(null);
    }, 3000);
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <h2 className="mb-2 text-xl">Update {name}</h2>
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
        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            {name}
          </label>
          <input
            type="text"
            pattern="\S(.*\S)?"
            title="This field is required"
            required
            className="bg-gray-800 pl-2 py-1 mb-2 text-sm font-medium rounded-lg"
            placeholder={`Enter ${name.toLowerCase()}`}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-cyan-700 hover:bg-primary-700  text-gray-100  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 my-2 text-center"
        >
          Update
        </button>
        <div>
          <p className="text-white">
            {infoMessage !== null ? infoMessage : null}
          </p>
        </div>
      </form>
    </section>
  );
};
