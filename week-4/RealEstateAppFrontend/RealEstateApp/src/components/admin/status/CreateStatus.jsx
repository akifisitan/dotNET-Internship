import { useState } from "react";
import { addStatus } from "../../../services/StatusService";

const CreateStatus = () => {
  const [data, setData] = useState();
  const [infoMessage, setInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addStatus(data);
    if (!response) {
      setInfo("Something went wrong. Please try again");
    } else {
      const statusCode = response.status;
      switch (statusCode) {
        case 200: {
          setInfo("Status added");
          break;
        }
        case 403:
          setInfo("Forbidden");
          break;
        default:
          setInfo("Something went wrong. Please try again");
          break;
      }
    }
    setTimeout(() => {
      setInfo(null);
    }, 3000);
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <h2 className="mb-2 text-xl">Add Status</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            Status
          </label>
          <input
            type="text"
            required
            className="bg-gray-800 pl-2 py-1 mb-2 text-sm font-medium rounded-lg"
            placeholder="Enter status"
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-primary-700  text-gray-100  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 my-2 text-center"
        >
          Add
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

export default CreateStatus;
