import { useState, useEffect } from "react";
import { getPaginated } from "../../services/PropertyService";
import { ShowcaseTable } from "./ShowcaseTable";
import { useNavigate } from "react-router-dom";

export const PropertyShowcase = ({ data }) => {
  return (
    <div>
      <div className="flex p-2">
        {loading ? (
          <div className="w-12 mx-auto">
            <span className="loading loading-spinner loading-lg text-accent"></span>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ShowcaseTable data={data} />
        )}
      </div>
    </div>
  );
};
