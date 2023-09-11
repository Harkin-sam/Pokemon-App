import React from "react";

// higher order component for wrapping child components
const Wrapper = (Component: React.FC) => () => {
  return (
    <div className="content">
      <Component />
    </div>
  );
};

export default Wrapper;
