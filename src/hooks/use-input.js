import { useReducer } from "react";

const initialInputState = {
  value: "", // enteredValue
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  // state is previous state

  if (action.type === "INPUT") {
    //console.log("INPUT TOUCED", state.isTouched);
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    console.log("BLUR VALUE", action);
    return { value: action.value, isTouched: true };
  }

  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // make it generic to all input

  const valueIsValid = validateValue(inputState.value); // will call the pass function and enteredValue is simple the pass value in useInput hook
  //console.log("valueIsValid " + valueIsValid);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (user) => {
    dispatch({ type: "INPUT", value: user.target.value });
  };

  const valueBlurHandler = (user) => {
    dispatch({ type: "BLUR", value: user.target.value });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueBlurHandler, // function so it can be called from the component it called
    valueChangeHandler,
  };
};

export default useInput;
