import React from "react";
import "../loading.css";

const loading = () => {
  return (
    <div className="w-full h-screen pt-64 flex justify-center">
      <div className="loader"></div>
    </div>
  );
};

export default loading;
