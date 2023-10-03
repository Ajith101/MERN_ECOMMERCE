import React, { useEffect } from "react";
import { useAppStore } from "../../utils/store/AppStore";

const UserCard = ({ item, id }) => {
  const { name, email, isBlocked, role, _id } = item;
  return (
    <div className="grid w-full grid-cols-5 overflow-hidden border-[1px] bg-blue-100 p-3">
      <div className="">
        <h2>
          {`${id + 1}.)`} {name}
        </h2>
      </div>
      <div className="break-words font-[600]">{_id}</div>
      <div className="">No Role</div>
      <div className="break-words">{email}</div>
      <div className="break-words">Actions</div>
    </div>
  );
};

const UserList = () => {
  const { getAllUsers, allUser } = useAppStore();
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <h2 className="py-3">All users</h2>

      <div className="mx-3 flex w-full flex-col overflow-x-auto">
        {allUser?.map((item, id) => (
          <UserCard item={item} id={id} key={id} />
        ))}
      </div>
    </>
  );
};

export default UserList;
