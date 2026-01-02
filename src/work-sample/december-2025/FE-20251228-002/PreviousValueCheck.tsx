import { useState, useEffect, useRef } from 'react'

export const PreviousValueCheck = () => {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef<number | null>(null) // useRefで前回の値を記録

  const handleClickAddition = () => {
    setCount(prev => prev + 1)
  }

  const handleClickSubtraction = () => {
    setCount(prev => prev - 1)
  }

  useEffect(() => {
    // クリーンアップ関数を利用して、依存している値が変わる直前に実行
    // 前回のcountの値を保持
    return () => {
      prevCountRef.current = count
    }
  }, [count])

  return (
    <div>
      <ul>
        <li>現在のCount: {count}</li>
        <li>前回のCount: {prevCountRef.current === null ? '---' : prevCountRef.current}</li>
      </ul>
      <button onClick={handleClickAddition}>+1</button>
      <button onClick={handleClickSubtraction}>-1</button>
    </div>
  )
}
