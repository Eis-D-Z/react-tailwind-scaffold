import React from "react";
import ReactDOM from "react-dom";
import "./App.scss";

const App = () => {
  return (
    <div>
      <h1 className="text-red">Hello!!</h1>
      <h2>Welcome to your First React App..!</h2>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
