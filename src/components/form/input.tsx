import React, { forwardRef } from "react";
interface inputProps {
  name: string;
  title: string;
  type: string;
  className: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  autoComplete: React.HTMLInputAutoCompleteAttribute;
  value?: string;
  errorDiv?: string;
  errorMsg?: string;
}
const Input: React.FC<inputProps> = forwardRef((props, ref: any) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <input
        type={props.type}
        className={props.className}
        id={ref}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        autoComplete={props.autoComplete}
        value={props.value}
      />
      <div className={props.errorDiv}>{props.errorMsg}</div>
    </div>
  );
});

export default Input;
