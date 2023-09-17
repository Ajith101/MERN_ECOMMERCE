import React from "react";
import { GrClose } from "react-icons/gr";
import { useAppStore } from "../utils/store/AppStore";
import { useNavigate } from "react-router-dom";

const CartCard = ({ item }) => {
  const { removeCart, addQty, decreaseQty } = useAppStore();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between gap-[10px] border-b-[1px] py-[5px]">
        <div className="h-[110px] w-[110px] sm:h-[150px] sm:w-[150px]">
          <img
            onClick={() => navigate(`/product/${item?.productId?._id}`)}
            src={item?.productId?.images[0]?.url}
            className="h-full w-full cursor-pointer object-contain"
            alt=""
          />
        </div>
        <div className="w-[40%] text-[13px] text-zinc-400 sm:w-[220px]">
          <p>{item?.productId?.category?.name}</p>
          <h1 className="text-[16px] font-medium text-[#505050] sm:text-[20px]">
            {item?.productId?.name}
          </h1>
        </div>
        <div className="flex items-center">
          <div className="shadows flex items-center rounded-[5px] bg-[#f7f8fd]">
            <button
              onClick={() => {
                item?.quantity === 1
                  ? removeCart(item?.productId?._id)
                  : decreaseQty(item?.productId?._id);
              }}
              className="px-[10px] py-[5px] text-center text-[16px] sm:px-[20px] sm:text-[28px]"
            >
              -
            </button>
            <p>{item?.quantity}</p>
            <button
              onClick={() => addQty(item?.productId?._id)}
              className="px-[10px] py-[5px] text-center text-[16px] sm:px-[20px] sm:text-[28px]"
            >
              +
            </button>
          </div>
        </div>
        {/* <div className="flex w-[150px] justify-center gap-[15px]">
         <BiMinus
           size={"25px"}
           className="cursor-pointer"
           onClick={() => {
             item.qty === 1 ? removeCart(item.id) : decreaseQty(item.id);
           }}
         />
         <p>{item.qty}</p>
         <BiPlus
           size={"25px"}
           className="cursor-pointer"
           onClick={() => addQty(item.id)}
         />
       </div> */}
        <div className="w-[60px]">
          <h2 className="text-[16px] font-medium text-[#121212] sm:text-[18px]">
            $ <span className="text-red-500">{item?.productId?.price}</span>
          </h2>
        </div>
        <div className="flex w-[60px] cursor-pointer justify-end">
          <GrClose
            size={"18px"}
            onClick={() => removeCart(item?.productId?._id)}
          />
        </div>
      </div>
    </>
  );
};

export default CartCard;
// const CartCard = ({ item }) => {
//   const { removeCart, addQty, decreaseQty } = useAppStore();
//   const navigate = useNavigate();
//   return (
//     <div className="flex items-center justify-between gap-[10px] border-b-[1px] py-[5px]">
//       <div className="h-[110px] w-[110px] sm:h-[150px] sm:w-[150px]">
//         <img
//           onClick={() => navigate(`/product/${item?.productId?._id}`)}
//           src={item?.productId?.images[0]?.url}
//           className="h-full w-full cursor-pointer object-contain"
//           alt=""
//         />
//       </div>
//       <div className="w-[40%] text-[13px] text-zinc-400 sm:w-[220px]">
//         <p>{item?.productId?.category}</p>
//         <h1 className="text-[16px] font-medium text-[#505050] sm:text-[20px]">
//           {item?.productId?.name}
//         </h1>
//       </div>
//       <div className="flex items-center">
//         <div className="shadows flex items-center rounded-[5px] bg-[#f7f8fd]">
//           <button
//             onClick={() => {
//               item?.quantity === 1
//                 ? removeCart(item?.productId?._id)
//                 : decreaseQty(item?.productId?._id);
//             }}
//             className="px-[10px] py-[5px] text-center text-[16px] sm:px-[20px] sm:text-[28px]"
//           >
//             -
//           </button>
//           <p>{item?.quantity}</p>
//           <button
//             onClick={() => addQty(item?.productId?._id)}
//             className="px-[10px] py-[5px] text-center text-[16px] sm:px-[20px] sm:text-[28px]"
//           >
//             +
//           </button>
//         </div>
//       </div>
//       {/* <div className="flex w-[150px] justify-center gap-[15px]">
//         <BiMinus
//           size={"25px"}
//           className="cursor-pointer"
//           onClick={() => {
//             item.qty === 1 ? removeCart(item.id) : decreaseQty(item.id);
//           }}
//         />
//         <p>{item.qty}</p>
//         <BiPlus
//           size={"25px"}
//           className="cursor-pointer"
//           onClick={() => addQty(item.id)}
//         />
//       </div> */}
//       <div className="w-[60px]">
//         <h2 className="text-[16px] font-medium text-[#121212] sm:text-[18px]">
//           $ <span className="text-red-500">{item?.productId?.price}</span>
//         </h2>
//       </div>
//       <div className="flex w-[60px] cursor-pointer justify-end">
//         <GrClose
//           size={"18px"}
//           onClick={() => removeCart(item?.productId?._id)}
//         />
//       </div>
//     </div>
//   );
// };

// export default CartCard;
