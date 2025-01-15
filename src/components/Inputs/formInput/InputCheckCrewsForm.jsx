import React from 'react';

export default function InputCheckCrewsForm({
  label,
  type,
  spam,
  cols,
  register,
  options,
  errors,
}) {


  return (
    <div className={`flex w-full cols justify-start gap-5 content-center cols-${!cols || cols === 1 ? '1' : cols}`} >
      <label className="text-sm flex items-start m-1 font-semibold">
        <p>{label}</p>
        {spam === true && <span className="text-red-500">*</span>}
      </label>
      <div className='grid grid-cols-4 gap-2 items-start text-[13px]'>
        {
          options.map((option,index) => (
            <div key={index}className='flex gap-2'>
              <input type={type} value={option.name} {...register} className='custom-checkbox' />
              <label htmlFor="">{option.name}</label>
            </div>
          ))
        }
      </div>
      {errors}
    </div>
  );
}
