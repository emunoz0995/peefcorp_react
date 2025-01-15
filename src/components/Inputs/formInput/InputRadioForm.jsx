import React from 'react';

export default function InputRadioForm({
  label,
  type,
  spam,
  cols,
  register,
  options,
  errors,
}) {


  return (
    <div className={`flex flex-col w-full cols justify-start item gap-2 content-center cols-${!cols || cols === 1 ? '1' : cols}`} >
      <label className="text-sm flex items-start m-1 font-semibold">
        <p>{label}</p>
        {spam === true && <span className="text-red-500">*</span>}
      </label>
      <div className='flex gap-2 items-start text-[13px]'>
        {
          options?.map((option, index) => (
            <div key={index} className='flex gap-2'>
              <input type={type} value={option} {...register} className='custom-checkbox' />
              <label htmlFor="">{option}</label>
            </div>
          ))
        }
      </div>
      {errors}
    </div>
  );
}
