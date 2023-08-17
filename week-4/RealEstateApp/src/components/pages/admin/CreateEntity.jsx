import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { insertEntity } from "../../../services/EntityService";

export const CreateEntity = ({ entityData }) => {
  const [data, setData] = useState();
  const [infoMessage, setInfo] = useState(null);
  const navigate = useNavigate();
  const { name, path } = entityData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await insertEntity(path, { value: data });
    if (!response) {
      setInfo(
        "We're sorry, but we couldn't process your request at the moment. Please try again later."
      );
    } else {
      const statusCode = response.statusCode;
      switch (statusCode) {
        case 200:
          setInfo(`${name} created successfully.`);
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
      <h2 className="mb-2 text-xl">Create {name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            {name}
          </label>
          <input
            type="text"
            required
            pattern="\S(.*\S)?"
            title="This field is required"
            className="bg-gray-800 pl-2 py-1 mb-2 text-sm font-medium rounded-lg"
            placeholder={`Enter ${name.toLowerCase()}`}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-primary-700  text-gray-100  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 my-2 text-center"
        >
          Create
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
