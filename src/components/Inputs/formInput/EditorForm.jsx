import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditorForm({
  id,
  onChange,
  initialValue,
  label,
  spam,
  cols,
}) {

  const customColors = [
    '#000000', '#2e6a82', '#ffffff', '#f59e0b','#1a893c', '#6b7280'
  ];

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'color': customColors }, { 'background': customColors }], // Custom colors
    ],
  };

  const formats = [
    'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'color', 'background', // Add color and background formats
  ];

  return (
    <div
      className={`flex text-start h-full flex-col w-full cols  cols-${!cols || cols === 1 ? '1' : cols
        }`}
    >
      <label className="text-sm flex items-center m-1 font-semibold">
        <p>{label}</p>
        {spam === true && <span className="text-red-500">*</span>}
      </label>
      <div className='flex w-full h-full p-2'>
        <ReactQuill
          modules={modules}
          formats={formats}
          value={initialValue}
          onChange={onChange}
          className='w-full h-full outline-none input-bordered focus:outline-none focus:ring-1 bg-gray-400 textarea contenedor rounded-md shadow-gray-300 shadow-lg' />
      </div>
    </div>
  );
}
