import React from 'react';


export default function InputDeckForm({
  label,
  type,
  input,
  cols,
  placeholder,
  onChange,
  value,
}) {

  return (
    <div
      className={`flex text-start flex-col w-full cols  cols-${!cols || cols === 1 ? '1' : cols
        }`}
    >
      <label className="text-sm flex items-center m-1 font-semibold">
        <p>{label}</p>
      </label>
     
        <input
          className={`${input} ${input === 'file-input'
            ? 'file-input-sm file-input-info file-input-bordered  '
            : 'input-sm'
            }  input-bordered bg-slate-200 focus:outline-none focus:ring-1 rounded-md shadow-base-400 shadow-md`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
    </div>
  );
}
