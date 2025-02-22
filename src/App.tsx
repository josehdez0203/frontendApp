import React from "react";
import { Button } from "./components/button";
import "./styles/global.scss";

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>My React typescript app</h1>
      <Button> Click me!</Button>
    </div>
  );
};

export default App;
