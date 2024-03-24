import React from "react";

const CardItem = ({ icon, title, value }) => {
  return (
    <div className="card-item bg-gray-800 p-8 rounded-lg ">
      <div className="flex items-center gap-x-4">
        <div className="rounded-full bg-white w-16 h-16 p-3">
          <img src={icon} alt="user" />
        </div>
        <div className="text-white flex flex-col">
          <span className="mb-2 text-lg font-semibold text-gray-400">
            {title}
          </span>
          <span className="text-xl font-semibold text-gray-200">{value}</span>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
