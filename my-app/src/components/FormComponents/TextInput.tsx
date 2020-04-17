import React from "react";

interface Props {
  label: string,
  onChange: (event: any) => void,
  value: string,
  placeholder: string,
  error?: string,
}

const TextInput = (props: Props) => {
  const { label, onChange, value, placeholder, error } = props;

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="field">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default TextInput;
