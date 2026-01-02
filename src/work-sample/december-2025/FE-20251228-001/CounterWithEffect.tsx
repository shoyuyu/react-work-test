import { useState, useEffect, useRef } from 'react'

export const CounterWithEffect = () => {
  const [count, setCount] = useState(0)
  const firstRender = useRef(true) // 初回レンダリングを保持

  const handleClickAddition = () => {
    setCount(prev => prev + 1)
  }

  const handleClickSubtraction = () => {
    setCount(prev => prev - 1)
  }

  // 通常は初回も実行されるが、firstRenderがtrueのとき、処理をスキップして初回レンダリングを回避
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    console.log(`count changed: ${count}`)
    if (count < 0) console.warn('count is negative')
  }, [count])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClickAddition}>+1</button>
      <button onClick={handleClickSubtraction}>-1</button>
    </div>
  )
}
