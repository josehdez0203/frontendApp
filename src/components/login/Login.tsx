import { useNavigate, useOutletContext } from "react-router-dom";
import Input from "../form/input";
import styles from "./login.module.scss";
import React, { useState } from "react";
const apiURL = process.env.REACT_APP_BACKEND;
interface datos {
  setJwtToken: React.Dispatch<React.SetStateAction<string>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  setAlertClassName: React.Dispatch<React.SetStateAction<string>>;
  toggleRefresh: any;
}
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setJwtToken, setAlertClassName, setAlertMessage, toggleRefresh } =
    useOutletContext<datos>();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Cred: ", email, password);
    let payload = {
      email: email,
      password: password,
    };
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    };

    fetch(`${apiURL}/api/authenticate`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setAlertClassName("alert-danger");
          setAlertMessage(data.message);
        } else {
          setJwtToken(data.access_token);
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          setAlertMessage("");
          setAlertClassName("d-none");
          toggleRefresh(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setAlertClassName("d-none");
        setAlertMessage(err);
      });
  };
  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <Input
          title="Email Address"
          type="email"
          className="form-control"
          name="email"
          autoComplete="email-new"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          title="Password"
          type="password"
          className="form-control"
          name="password"
          autoComplete="password-new"
          onChange={(event) => setPassword(event.target.value)}
        />
        <hr />
        <input type="submit" className="btn btn-success" />
      </form>
    </div>
  );
};

export default Login;
