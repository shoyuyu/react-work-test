import { useState, useRef } from 'react'

export const RenderCounter = () => {
  const [count, setCount] = useState(0)
  const renderCountRef = useRef(0)

  const handleClick = () => {
    setCount(prev => prev + 1)
  }

  const handleClickRef = () => {
    renderCountRef.current += 1
  }

  return (
    <div>
      <ul>
        <li>現在のcount: {count}</li>
        <li>現在のrenderCountRef.current: {renderCountRef.current}</li>
      </ul>
      <button type="button" onClick={handleClick}>
        +1
      </button>
      <button type="button" onClick={handleClickRef}>
        ref を +1 するだけのボタン
      </button>
    </div>
  )
}
