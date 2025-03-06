import React from "react";
type option = {
  id: string;
  value: string;
};
interface selectProps {
  name: string;
  value: string;
  title: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  placeholder: string;
  options: [option];
  errorMsg?: string;
  errorDiv?: string;
}
const Select: React.FC<selectProps> = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <select
        className="form-control"
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        <option value="">{props.placeholder}</option>
        {props.options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.value}
            </option>
          );
        })}
      </select>
      <div className={props.errorDiv}>{props.errorMsg}</div>
    </div>
  );
};
export default Select;
