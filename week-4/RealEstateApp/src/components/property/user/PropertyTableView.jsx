import { useNavigate } from "react-router-dom";

const PropertyTableView = ({ data }) => {
  const numRows = Math.ceil(data.length / 7);
  const navigate = useNavigate();
  const handleClick = (entry) => {
    navigate("/editProperty", {
      replace: false,
      state: { propertyId: entry.id },
    });
  };

  const tableRows = Array.from({ length: numRows }, (_, rowIndex) => (
    <tr key={rowIndex}>
      {data.slice(rowIndex * 7, (rowIndex + 1) * 7).map((entry) => (
        <td className="p-2" key={entry.id}>
          <img
            className="block m-auto cursor-pointer w-32 h-24"
            onClick={() => handleClick(entry)}
            src={`data:image/jpeg;base64,${entry.thumbnail}`}
            alt="property"
          />
          <p className="text-center">
            {entry.type} {`(${entry.status})`}
            <br />
            {entry.price} {`(${entry.currency})`}
          </p>
        </td>
      ))}
    </tr>
  ));

  return (
    <table className="showcase-table">
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default PropertyTableView;
