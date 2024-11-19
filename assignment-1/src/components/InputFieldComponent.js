import React from "react";
import '../Style.css';

const InputComponent = ({ 
  label, 
  name, 
  type,
  value, 
  onChange, 
  placeholder, 
  errorMessage, 
  required 
}) => {
  return (

    <div>
      <label className="form-label">
        {label} {required && <span>*</span>}
      </label>
      <input className="form-field"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
     {errorMessage && (
        <small className='formError'>{String(errorMessage)}</small>
      )}
    </div>
  );
};

export default InputComponent;