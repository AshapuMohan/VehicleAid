import React from "react";

const Card = ({ children }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md">
      {children}
    </div>
  );
};

export default Card;
