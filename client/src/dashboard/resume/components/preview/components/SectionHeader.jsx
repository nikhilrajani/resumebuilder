import React from "react";

const SectionHeader = ({ title }) => {
  return (
    <div>
      <hr className="h-[2px] bg-gray-600/30" />
      <div
        className="h-[30px] font-bold flex justify-center items-center uppercase section-header"
        style={{ backgroundColor: "#E0E8F0" }}
      >
        {title}
      </div>
      <hr className="h-[2px] bg-gray-600/30" />
    </div>
  );
};

export default SectionHeader;
