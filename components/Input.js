import React from "react";

const Input = (props ) => {
  return (
    <input
      {...props}
      className="border-[1px] border-gray-500 rounded-md p-1 font-normal"
    />
  );
};

export default Input;