const Home = () => {
  const image = "base64 encoded image";
  return (
    <div className="p-4">
      <h1 className="text-2xl p-1">Home Page</h1>
      <p className="text-xl p-1">Click on the links above to navigate.</p>
      <img src={`data:image/png;${image}`} alt="base64 encoded image" />
    </div>
  );
};

export default Home;
