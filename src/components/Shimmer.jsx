const Shimmer = () => {
  return (
    <div className="flex flex-wrap ml-16">
      {Array(60)
        .fill("")
        .map((e, index) => (
          <div key={index} className="w-56 h-64 bg-gray-300 m-5 "></div>
        ))}
    </div>
  );
};

export default Shimmer;
