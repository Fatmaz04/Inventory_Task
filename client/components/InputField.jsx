import React from 'react';

const InputField = ({ 
  label, 
  id, 
  type = 'text', 
  value, 
  onChange, 
  onBlur, 
  placeholder, 
  error, 
  touched 
}) => {
  return (
    <div className="my-3">
      <label htmlFor={id} className="pr-2">
        {label}{" "}
      </label>
      <input
        value={value}
        onChange={onChange}
        id={id}
        type={type}
        placeholder={placeholder}
        onBlur={onBlur}
        className={`border p-2 rounded-lg w-full focus:outline-none focus:border-orgblue hover:border-orgblue shadow-sm transition duration-300 ${
          error && touched ? "border-[#ff4545]" : "border-[#bfbfbf]"
        }`}
      />
      {error && touched && (
        <p className="text-xs text-[#ff4545]">{error}</p>
      )}
    </div>
  );
};

export default InputField;
