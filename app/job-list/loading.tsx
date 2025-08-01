import React from "react";
import "../loading.css"

const loading = () => {
  return <div className="w-full h-screen flex justify-center pt-64">
    <div className="loader"></div>
  </div>;
};

export default loading;
