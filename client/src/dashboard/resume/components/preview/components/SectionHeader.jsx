import React from "react";

const SectionHeader = ({ title }) => {
  return (
    <div>
      <hr className="h-[2px] bg-gray-600/30" />
      <div className="h-[30px] bg-[#E0E8F0] font-bold flex justify-center items-center uppercase">
        {title}
      </div>
      <hr className="h-[2px] bg-gray-600/30" />
    </div>
  );
};

export default SectionHeader;
