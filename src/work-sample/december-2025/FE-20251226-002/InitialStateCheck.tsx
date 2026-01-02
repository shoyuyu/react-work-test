import { useState } from 'react'

export const InitialStateCheck = () => {
  // 初期値は最初にマウントしたときだけ使われる
  // 途中でuseState(100)に変えても、すでにマウント済みのコンポーネントには影響しない
  const [count, setCount] = useState(0)

  // 単体コンポーネントだから、useCallbackは不要
  const handleClick = () => {
    console.log('count:', count)
    setCount(prev => prev + 1) // ここで再レンダーされるため、表示が変わる
  }

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={handleClick}>+1</button>
    </div>
  )
}
