import { useState, useEffect, useRef } from 'react'

export const SeparatedEffects = () => {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const isFirstRenderRef = useRef(true)

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      return
    }
    console.log('count changed:', count)
  }, [count])

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      return
    }
    console.log('text changed:', text)
  }, [text])

  const handleClick = () => {
    setCount(prev => prev + 1)
  }

  return (
    <div>
      <dl>
        <dt>Count: {count}</dt>
        <dd>
          <button type="button" onClick={handleClick} />
        </dd>
      </dl>
      <dl>
        <dt>Text</dt>
        <dd>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="テキストを入力してください"
          />
        </dd>
      </dl>
    </div>
  )
}
