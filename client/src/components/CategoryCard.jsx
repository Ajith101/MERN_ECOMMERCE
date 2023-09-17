import React from "react";
import { LiaEdit } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ item, setShowpopUp, setId, path }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col transition-all ease-in-out hover:scale-110">
        <div className="flex w-full flex-col overflow-hidden rounded-md bg-white">
          <div className="bg-white p-2">
            <img
              src={item?.image?.url}
              className="h-[190px] w-full object-contain"
              alt=""
            />
          </div>
          <div className="bg-gray-200 text-center">
            <h2 className="py-3">{item?.name}</h2>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 py-2">
          <LiaEdit
            onClick={() => navigate(`${path}${item._id}`)}
            size={"22px"}
            className="cursor-pointer transition-all ease-in-out hover:scale-110"
          />
          <MdDelete
            onClick={() => {
              setShowpopUp(true);
              setId(item._id);
            }}
            color="red"
            size={"22px"}
            className="cursor-pointer transition-all ease-in-out hover:scale-110"
          />
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
