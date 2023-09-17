import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillCloseCircle } from "react-icons/ai";

const DeletePopup = ({ setShowpopUp, handleDelete, id }) => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.3)]">
      <div className="relative flex w-[80%] max-w-[440px] flex-col items-center justify-center gap-2 rounded-3xl bg-white p-10">
        <RiDeleteBin6Line size={"50px"} />{" "}
        <span>Are you sure want to delete this</span>
        <div className="flex items-center gap-4 pt-5">
          <button
            onClick={() => handleDelete(id, setShowpopUp)}
            className="rounded-full bg-red-700 px-10 py-3 text-white hover:scale-95"
          >
            Delete
          </button>
          <button
            onClick={() => setShowpopUp(false)}
            className="rounded-full border-[1px] px-10 py-3 hover:scale-95"
          >
            Cancel
          </button>
        </div>
        <AiFillCloseCircle
          onClick={() => setShowpopUp(false)}
          color="red"
          size={"25px"}
          className="absolute right-[-5px] top-[-5px]"
        />
      </div>
    </div>
  );
};

export default DeletePopup;
