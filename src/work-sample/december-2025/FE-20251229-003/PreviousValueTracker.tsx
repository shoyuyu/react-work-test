import { useState, useEffect, useRef } from 'react'

export const PreviousValueTracker = () => {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef<number | null>(null)
  const isFirstRender = useRef(true)

  const handleClickAddition = () => {
    setCount(prev => prev + 1)
  }

  const handleClickSubtraction = () => {
    setCount(prev => prev - 1)
  }

  useEffect(() => {
    // 初回は何もしない
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      const prev = prevCountRef.current
      const current = count
      console.log(`count: ${prev} → ${current}`)
    }
    // effectの最後でrefを更新（次回のための記録）
    prevCountRef.current = count
  }, [count])

  return (
    <div>
      <ul>
        <li>現在のCount: {count}</li>
        <li>前回のCount: {prevCountRef.current}</li>
      </ul>
      <button type="button" onClick={handleClickAddition}>
        +1
      </button>
      <button type="button" onClick={handleClickSubtraction}>
        -1
      </button>
    </div>
  )
}
