import { useNavigate } from "react-router-dom";

export const PropertyTableView = ({ data }) => {
  const rowLength = 8;
  const numRows = Math.ceil(data.length / rowLength);
  const navigate = useNavigate();
  const handleClick = (entry) => {
    navigate("/editProperty", {
      replace: false,
      state: { propertyId: entry.id },
    });
  };

  const tableRows = Array.from({ length: numRows }, (_, rowIndex) => (
    <tr key={rowIndex}>
      {data
        .slice(rowIndex * rowLength, (rowIndex + 1) * rowLength)
        .map((entry) => (
          <td className="p-2" key={entry.id}>
            <img
              className="block m-auto cursor-pointer w-32 h-24"
              onClick={() => handleClick(entry)}
              src={
                entry.thumbnail.startsWith("data:image")
                  ? entry.thumbnail
                  : `data:image/jpeg;base64,${entry.thumbnail}}`
              }
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
    <table>
      <tbody>{tableRows}</tbody>
    </table>
  );
};
