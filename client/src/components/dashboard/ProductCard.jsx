import React from "react";
import { useNavigate } from "react-router-dom";
import { LiaEdit } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";

const ProductCard = ({ item, setShowpopUp, setId }) => {
  const navigate = useNavigate();
  return (
    <div className="relative grid cursor-pointer grid-cols-5 gap-2 rounded-xl bg-white p-3 shadow-md">
      <div className="col-span-2 flex gap-3">
        <div className="h-[110px] w-[50%] rounded-lg sm:h-[150px]">
          <img
            src={item?.images[0]?.url}
            alt=""
            className="h-full w-full overflow-hidden rounded-lg object-contain"
          />
        </div>
        <div className="flex w-[50%] flex-col items-start gap-2 ">
          <h2 className="break-all font-[600]">{item?.name}</h2>
          <h2>{item?.category?.name}</h2>
          <h2>{item?.brand?.name}</h2>
        </div>
      </div>
      <div className="">
        <h2>$ {item?.price}</h2>
      </div>
      <div className="">
        <h2>{item?.stock} nos</h2>
      </div>
      <div className="">
        <h2>{item?.sold} nos</h2>
      </div>
      <div className="absolute bottom-2 right-3 flex items-center justify-end gap-2 py-2">
        <AiOutlineEye
          onClick={() => navigate(`/product/${item._id}`)}
          size={"22px"}
          className="cursor-pointer hover:scale-110"
        />
        <LiaEdit
          onClick={() => navigate(`/admin/edit-product/${item._id}`)}
          size={"22px"}
          className="cursor-pointer hover:scale-110"
        />
        <MdDelete
          onClick={() => {
            setShowpopUp(true);
            setId(item._id);
          }}
          color="red"
          size={"22px"}
          className="cursor-pointer hover:scale-110"
        />
      </div>
    </div>
  );
};

export default ProductCard;
