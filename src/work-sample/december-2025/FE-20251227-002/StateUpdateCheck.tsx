import { useState } from 'react'

export const StateUpdateCheck = () => {
  const [count, setCount] = useState(0)

  // ここではレンダー直後の同じ値に+1しているから、結果的に1だけ増える
  const handleClickValue = () => {
    setCount(count + 1)
    setCount(count + 1)
  }

  // ここでは直前の値を使って2回加算しているから、合計2増える
  const handleCLickFn = () => {
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClickValue}>値で +1</button>
      <button onClick={handleCLickFn}>関数で +1</button>
    </div>
  )
}
