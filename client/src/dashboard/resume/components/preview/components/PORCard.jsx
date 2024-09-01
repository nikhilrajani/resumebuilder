import React from "react";

const PORCard = ({ post }) => {
  return (
    <div className="w-fit">
      <div className="flex justify-between font-bold text-md">
        <div>{post.position}</div>
        <div>
          {post.startDate} -{" "}
          {!post.currentlyHolding ? `${post.endDate}` : "Present"}
        </div>
      </div>
      <div className="text-md">
        <div
          dangerouslySetInnerHTML={{ __html: post.workSummary }}
          className="rsw-ce ul"
          style={{ paddingLeft: "0px", paddingTop: "0px" }}
        />
      </div>
    </div>
  );
};

export default PORCard;
