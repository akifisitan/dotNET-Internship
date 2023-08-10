import PropertyShowcase from "./property/PropertyShowcase";

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl p-1">Home Page</h1>
      <div className="flex flex-row">
        <div className="basis-1/12">
          Filters
          <ul className="menu bg-base-200 rounded-box">
            <li>
              <a>Price</a>
            </li>
            <li>
              <a>Currency</a>
            </li>
            <li>
              <a>Type</a>
            </li>
            <li>
              <a>Status</a>
            </li>
          </ul>
        </div>
        <div className="basis-3/4">
          <PropertyShowcase />
        </div>
      </div>
    </div>
  );
};

export default Home;
