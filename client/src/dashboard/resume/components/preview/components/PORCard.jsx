import React from "react";

const PORCard = ({ post }) => {
  return (
    <div>
      <div className="flex justify-between font-bold text-md">
        <div>{post.position}</div>
        <div>
          {post.startDate} -{" "}
          {!post.currentlyHolding ? `${post.endDate}` : "Present"}
        </div>
      </div>
      <div className="text-md">
        {post.workSummary.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default PORCard;
