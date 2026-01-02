import { useState } from 'react'

export const LazyInitCheck = () => {
  // 遅延初期化という書き方：useStateに関数（() => {...}）を渡すと、コンポーネントが最初にマウントされる時だけ、その関数が実行されて、戻り値が初期値として使われる
  // マウントは1回のみ（strictモードでは2回）
  const [count, setCount] = useState(() => {
    console.log('init')
    return 0 // 初期値
  })

  const handleClick = () => {
    setCount(prev => prev + 1)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>+1</button>
    </div>
  )
}
