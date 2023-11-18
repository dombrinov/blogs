import React, { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const inc = () => setCount(count + 1);
  const dec = () => setCount(count - 1);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={inc}>Inc</button>
      <button onClick={dec}>Dec</button>
    </div>
  );
};
