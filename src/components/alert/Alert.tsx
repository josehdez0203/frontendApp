import React from "react";
interface alertProps {
  className: string;
  message: string;
}
const Alert: React.FC<alertProps> = ({ className, message }) => {
  return (
    <div className={"alert " + className} role="alert">
      {message}
    </div>
  );
};
export default Alert;
