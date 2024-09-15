import { useState } from "react";

function useInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  return [value, onValueChangeHandler];
}

export default useInput;
