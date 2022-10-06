import React, { useState } from 'react'

const Tournament = () => {

  function setInit() {
    console.log("function called");
    return 0
  }

  const [number, setNumber] = useState(() => setInit())

  function increase() {
    setNumber(prev => prev + 1)
  }
  function decrease() {
    setNumber(prev => prev - 1)
  }

  return (
    <div>
      <h1>Tounament</h1>
      <p>{number}</p>
      <button onClick={decrease}>-1</button>
      <button onClick={increase}>+1</button>
    </div>
  )
}

export default Tournament