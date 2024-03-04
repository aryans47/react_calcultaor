import React, { useState, useEffect } from "react";

import Header from "./Components/Header/Header";
import KeyPad from "./Components/KeyPad/KeyPad";

import moonIcon from "./assets/moon.png";
import sunIcon from "./assets/sun.png";

import "./App.css";
//keycode stored in array which we used 
const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("calculator-app-mode")) || false
  );
  const [expression, setExression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("calculator-app-history")) || []
  );
//handlekeypress function
  const handleKeyPress = (keyCode, key) => {
    //if not keycode simply return
    if (!keyCode) return;
    //if not usedkeycode simply return
    if (!usedKeyCodes.includes(keyCode)) return;

    if (numbers.includes(key)) {
      if (key === "0") {
        if (expression.length === 0) return;
      }
      //real time chalculation
      calculateResult(expression + key);
      //set expression
      setExression(expression + key);
    } 
    //checking operator
    else if (operators.includes(key)) {
      if (!expression) return;
  //slice used for last character
      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) return;
      if (lastChar === ".") return;

      setExression(expression + key);
    } 
    // for checking decimal
    else if (key === ".") {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;
      setExression(expression + key);
    } 
    //8 is for backspace
    else if (keyCode === 8) {
      if (!expression) return;
      //eg=115 set to 11 real time backspace
      calculateResult(expression.slice(0, -1));
      setExression(expression.slice(0, -1));
    } 
    //13 for enter
    else if (keyCode === 13) {
      if (!expression) return;
      calculateResult(expression);
//history
      let tempHistory = [...history];
      if (tempHistory.length > 20) tempHistory = tempHistory.splice(0, 1);
      tempHistory.push(expression);
      setHistory(tempHistory);
    }
  };
//caclulateResult function 
  const calculateResult = (exp) => {
    if (!exp) {
      setResult("");
      return;
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);
    const answer = eval(exp).toFixed(2) + "";
    setResult(answer);
  };

  useEffect(() => {
    localStorage.setItem("calculator-app-mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("calculator-app-history", JSON.stringify(history));
  }, [history]);

  return (
    <div
      className="app"
      tabIndex="0"
      onKeyDown={(event) => handleKeyPress(event.keyCode, event.key)}
  //condition for dark theme
      data-theme={isDarkMode ? "dark" : ""}
    >
      <div className="app_calculator">
        <div className="app_calculator_navbar">
      //toggle if it is darkmode is true it set to false and vice versa
          <div
            className="app_calculator_navbar_toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
              //toggle circle to change the image and side the circle 
            <div
              className={`app_calculator_navbar_toggle_circle ${
                isDarkMode ? "app_calculator_navbar_toggle_circle_active" : ""
              }`}
            />
          </div>
          <img src={isDarkMode ? moonIcon : sunIcon} alt="mode" />
        </div>

        <Header expression={expression} result={result} history={history} />
        <KeyPad handleKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}

export default App;
