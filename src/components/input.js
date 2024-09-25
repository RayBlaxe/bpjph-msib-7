import React from "react";

const TextInput = ({ className, ...args }) => {
  return (
    <input
      className={`bg-white-50 dark:bg-white-700 block w-full rounded-md border border-purple p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:rounded-md ${className}`}
      {...args}
    />
  );
};

export default TextInput;
