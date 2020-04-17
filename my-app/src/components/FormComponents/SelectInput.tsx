import React from "react";

interface Props {
    label: string,
    options: { text: string, value: string }[],
    onChange: (event: any) => void,
    defaultOption: string,
    value: string,
    error?: string,
}

const SelectInput = (props: Props) => {
    const { label, onChange, defaultOption, value, options, error } = props;

    return (
        <div className="form-group">
        <label>{label}</label>
        <div className="field">
          <select
            value={value}
            onChange={onChange}
            className="form-control"
          >
            <option value="">{defaultOption}</option>
            {options.map(option => {
              return (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    );
};

export default SelectInput;
