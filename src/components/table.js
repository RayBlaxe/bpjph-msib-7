import React from "react";
import _ from "lodash";

const Table = ({ options = [], data = [], className }) => {
  if (!options || !data) return null;
  if (data.length === 0) return null;
  return (
    <div className={`relative overflow-x-auto sm:rounded-lg ${className}`}>
      <table className="w-full text-left text-sm">
        <thead className="bg-purple text-xs uppercase text-white">
          <tr>
            {options.map((item) => {
              return (
                <th key={item.label} scope="col" className="px-6 py-3">
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr
                key={`tr-${index}`}
                className={`border-b bg-white hover:bg-gray-50 ${
                  index === data.length - 1 ? "border-b-0" : ""
                }`}
              >
                {options.map((option) => {
                  return (
                    <td key={`td-option.${option.key}`} className="px-6 py-4">
                      {_.get(item, option.key)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
