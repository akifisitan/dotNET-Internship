import PropertyShowcase from "./property/PropertyShowcase";
import Filters from "./Filters";
import { useState } from "react";

const Home = () => {
  const [filters, setFilters] = useState();
  console.log("home re-rendered");
  return (
    <div className="p-2">
      <h1 className="text-2xl p-1">Home Page</h1>
      <div className="flex flex-row">
        <div className="basis-1/4">
          <Filters setFilters={setFilters} />
        </div>
        <div className="basis-4/5">
          <PropertyShowcase filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default Home;
