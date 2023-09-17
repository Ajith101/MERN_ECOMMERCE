import React from "react";

export const InputForm = ({
  handleChange,
  title,
  name,
  type,
  value,
  handleBlur,
  errors,
  touched,
}) => {
  return (
    <div className="flex flex-col pb-4">
      <label htmlFor="email" className="text-gray-500">
        {title}
      </label>
      {errors[name] && touched[name] ? (
        <span className="text-[14px] text-red-600">{errors[name]}</span>
      ) : null}
      <input
        id={name}
        type={type ? type : "text"}
        name={name}
        className="w-full rounded-xl border-[1px] p-2 outline-none"
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
    </div>
  );
};
