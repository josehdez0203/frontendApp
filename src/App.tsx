import "./styles/global.scss";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/alert/Alert";
import { Header } from "./components/header/Header";
const apiURL = process.env.REACT_APP_BACKEND;

const App: React.FC = () => {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");
  // const [ticking, setTicking] = useState(false);
  const [tickInterval, setTickInterval] = useState<
    number | NodeJS.Timer | undefined
  >();
  const navigate = useNavigate();
  type dataAuth = {
    access_token: string;
    refresh_token: string;
  };

  const setAuth = (data: dataAuth) => {
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("access_token", data.access_token);
  };
  const logOut = () => {
    const requestOptions = {
      method: "GET",
      // credentials: "include",
    };
    let url = `${apiURL}/api/logout`;
    console.log(url);
    fetch(url, requestOptions)
      .catch((error) => console.log("error logging out", error))
      .finally(() => {
        setJwtToken("");
        toggleRefresh(false);
        // cookies.remove("__Host-refresh_token", {
        //   domain: "localhost",
        //   path: "",
        //   sameSite: "none",
        // });
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      });
    navigate("/login");
  };

  const toggleRefresh = useCallback(
    (status: any) => {
      console.log("clicked");
      if (status) {
        console.log("turning on ticking");
        let i = setInterval(() => {
          let payload = {
            token: localStorage.getItem("refresh_token"),
          };
          const requestOptions: RequestInit = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(payload),
          };

          let url = `${apiURL}/api/refresh`;
          console.log(url, Date.now());
          fetch(`${apiURL}/api/refresh`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              if (data.access_token) {
                setAuth(data);
                setJwtToken(data.access_token);
              }
            })
            .catch((error) => console.log("user is not logged in", error));
          console.log("corriendo 🕑");
        }, 600000);
        setTickInterval(i);
        console.log("set ticking interval 🕐", i);
        // setTicking(true);
      } else {
        console.log("apagando 🔛");
        console.log("apagando 🚥", tickInterval);
        setTickInterval(undefined);
        clearInterval(tickInterval);
        // setTicking(false);
      }
    }, //eslint-disable-next-line
    [tickInterval],
  );

  useEffect(
    () => {
      if (jwtToken === "") {
        let payload = {
          token: localStorage.getItem("refresh_token"),
        };
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        };

        fetch(`${apiURL}/api/refresh`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.access_token) {
              setAuth(data);
              setJwtToken(data.access_token);
            } else {
              navigate("/login");
            }
          })
          .catch((error) => console.error("user is not logged in", error));
      }
    }, //eslint-disable-next-line
    [jwtToken, toggleRefresh],
  );

  return (
    <div className="container">
      <Alert message={alertMessage} className={alertClassName} />
      <Header logOut={logOut} jwtToken={jwtToken} />
      <Outlet
        context={{
          logOut,
          jwtToken,
          setJwtToken,
          setAlertMessage,
          setAlertClassName,
          toggleRefresh,
        }}
      />
    </div>
  );
};

export default App;
