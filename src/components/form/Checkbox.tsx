import React, { ChangeEventHandler } from "react";

interface checkboxProps {
  title: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}
const Checkbox: React.FC<checkboxProps> = ({
  name,
  value,
  onChange,
  checked,
  title,
}) => {
  return (
    <div className="form-check">
      <input
        type="checkbox"
        id={name}
        className="form-check-input"
        value={value}
        name={name}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={name} className="form-check-label">
        {title}
      </label>
    </div>
  );
};

export default Checkbox;
