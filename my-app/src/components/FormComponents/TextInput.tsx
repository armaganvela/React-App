import React from "react";

interface Props {
  label: string,
  onChange: (event: any) => void,
  value: string,
  placeholder: string,
}

const TextInput = (props: Props) => {
  const { label, onChange, value, placeholder } = props;

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
      </div>
    </div>
  );
};

export default TextInput;
