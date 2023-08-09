// ShowcaseTable.js
import React from "react";

const ShowcaseTable = ({ showcaseData, navigateToProperty }) => {
  const numRows = Math.ceil(showcaseData.length / 7);

  const tableRows = Array.from({ length: numRows }, (_, rowIndex) => (
    <tr key={rowIndex}>
      {showcaseData.slice(rowIndex * 7, (rowIndex + 1) * 7).map((entry) => (
        <td className="p-2" key={entry.id}>
          <img
            className="block m-auto cursor-pointer w-32 h-24"
            onClick={() => navigateToProperty(entry.id)}
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

export default ShowcaseTable;
