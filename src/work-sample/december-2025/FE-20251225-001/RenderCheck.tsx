import { useRef, useState } from 'react'

export const RenderCheck = () => {
  let normalCount = 0
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0) // 0で初期化された箱

  const handleClick = () => {
    normalCount++
    setStateCount(prev => prev + 1) // 即時にstateを変えない。「次のrenderでこの値を使ってね」という予約
    refCount.current++
    console.log('normal:', normalCount)
    console.log('state:', stateCount)
    console.log('ref:', refCount.current) // refCount.currentで値の読み書き
  }

  return (
    <div>
      <p>normal: {normalCount}</p>
      <p>state: {stateCount}</p>
      <p>ref: {refCount.current}</p>

      <button onClick={handleClick}>+1</button>
    </div>
  )
}
