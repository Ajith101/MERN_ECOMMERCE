import React from "react";

const FormLayout = ({ children }) => {
  return (
    <div className="my-10 flex min-h-screen w-full items-center justify-center">
      <div className="shadows h-[80%] w-[80%] max-w-[550px] rounded-2xl p-5">
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
