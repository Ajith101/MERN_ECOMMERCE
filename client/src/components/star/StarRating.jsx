import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const ratingStar = Array.from({ length: 5 }, (ele, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <AiFillStar className="text-yellow-400" size={"15px"} />
        ) : rating >= number ? (
          <FaStarHalfAlt className="text-yellow-400" size={"13px"} />
        ) : (
          <AiOutlineStar className="text-yellow-400" size={"15px"} />
        )}
      </span>
    );
  });
  return <div className="flex items-center gap-[2px]">{ratingStar}</div>;
};

export default StarRating;
