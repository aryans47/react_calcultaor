import React, { useEffect, useRef } from "react";

import "./Header.css";

function Header(props) {
  const resultRef = useRef();
  const expressionRef = useRef();
//scroll
  useEffect(() => {
    resultRef.current.scrollIntoView();
  }, [props.history]);

  useEffect(() => {
    expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
  }, [props.expression]);

  return (

    //history
    <div className="header custom-scroll">
      <div className="header_history">
        {props.history &&
          props.history?.map((item) => (
            <p key={item + "" + Math.random() * 44}>{item}</p>
          ))}
      </div>
      <br />

    //expression
      <div ref={expressionRef} className="header_expression custom-scroll">
        <p>{props.expression}</p>
      </div>

        //result
      <p ref={resultRef} className="header_result">
        {props.result}
      </p>
    </div>
  );
}

export default Header;
