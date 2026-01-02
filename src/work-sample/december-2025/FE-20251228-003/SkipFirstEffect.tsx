import { useState, useEffect, useRef } from 'react'

export const SkipFirstEffect = () => {
  const [text, setText] = useState('')
  const isFirstRenderRef = useRef(true)

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      return
    }
    console.log('text changed:', text)
  }, [text])

  return (
    <div>
      <input
        type="text"
        value={text}
        placeholder="テキストを入力してください"
        onChange={e => setText(e.target.value)}
      />
    </div>
  )
}
