import React from 'react';


export default function InputForm({
  label,
  type,
  input,
  spam,
  cols,
  register,
  placeholder,
  errors,
  errorsTwo,
  defaultValue,
  onChange,
  disable,
  value,
  link
}) {

  return (
    <div
      className={`flex text-start flex-col w-full cols  cols-${!cols || cols === 1 ? '1' : cols
        }`}
    >
      <label className="text-sm flex items-center m-1 font-semibold">
        <p>{label+" "} <a className="text-sky-600" href="https://drive.google.com/file/d/1E_XeEvXUKvCNGforCZdmo7htKsV-tS8K/view?usp=sharing" target="_blank">{link}</a></p>
        {spam === true && <span className="text-red-500">*</span>}
      </label>
      {disable ?
        <input
          className={`${input} ${input === 'file-input'
            ? 'file-input-sm file-input-info file-input-bordered  '
            : 'input-sm'
            }  outline-none input-bordered focus:outline-none focus:ring-1 rounded-md shadow-base-400 shadow-lg`}
          type={type}
          {...register}
          placeholder={placeholder}
          defaultValue={defaultValue}
          
          onChange={onChange ? () => onChange() : null}
          disabled
        /> :
        <input
          className={`${input} ${input === 'file-input'
            ? 'file-input-sm file-input-info file-input-bordered  '
            : 'input-sm'
            }  input-bordered bg-slate-200 focus:outline-none focus:ring-1 rounded-md shadow-base-400 shadow-md`}
          type={type}
          {...register}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange ? () => onChange() : null}
        />
      }

      {errors}
      {errorsTwo}
    </div>
  );
}
