import { useState } from "react";

export function useCounter({
  defaultValue = 0,
  maxValue = Infinity,
  minValue = -Infinity,
} = {}) {
  const [counterValue, setCounterValue] = useState<number>(defaultValue);

  const increment = () => {
    if (counterValue === maxValue) {
      return;
    }
    setCounterValue((prevValue) => ++prevValue);
  };

  const decrement = () => {
    if (counterValue === minValue || counterValue < minValue) {
      return setCounterValue(minValue);
    }
    setCounterValue((prevValue) => --prevValue);
  };

  const reset = () => {
    if (defaultValue > maxValue || defaultValue < minValue) {
      return setCounterValue(0);
    }
    setCounterValue(defaultValue);
  };

  const setValue = (value = defaultValue) => {
    if (value > maxValue || value < minValue) {
      return setCounterValue(0);
    }
    setCounterValue(value);
  };

  return { counterValue, decrement, increment, reset, setValue };
}
