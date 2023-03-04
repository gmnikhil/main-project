import React from "react";

// reactstrap components
import { Button } from "reactstrap";

function Example() {
  return (

      <button background-color="#FFF" className="px-4 py-4 rounded" onClick={(e) => { e.preventDefault(); doSomething(); }} > Color </button>

  );
}

export default Example;

