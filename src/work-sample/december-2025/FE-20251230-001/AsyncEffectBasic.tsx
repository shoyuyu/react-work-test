import { useState, useEffect } from 'react'

export const AsyncEffectBasic = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(prev => prev + 1)
  }

  useEffect(() => {
    setTimeout(() => {
      console.log('async finished:', count)
    }, 1000)
  }, [count])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>+1</button>
    </div>
  )
}
