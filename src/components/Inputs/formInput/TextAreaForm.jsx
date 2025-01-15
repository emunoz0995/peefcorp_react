import React from 'react';


export default function TextAreaForm({
  label,
  input,
  spam,
  cols,
  register,
  placeholder,
  errors,
  errorsTwo,
  value,
  onChange,

}) {


  return (
    <div
      className={`flex flex-col w-full cols  cols-${!cols || cols === 1 ? '1' : cols
        }`}
    >
      <label className="text-sm flex items-center m-1 font-semibold">
        <p>{label}</p>
        {spam === true && <span className="text-red-500">*</span>}
      </label>
      <textarea maxLength={270}
        className={`${input} ${input === 'file-input'
          ? 'file-input-sm file-input-info file-input-bordered  '
          : 'input-sm'
          }  outline-none input-bordered focus:outline-none focus:ring-1 bg-slate-200 textarea h-[100px] contenedor rounded-md shadow-gray-300 shadow-lg`}
        {...register}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? onChange : null}
      />
      {errors}
      {errorsTwo}
    </div>
  );
}
