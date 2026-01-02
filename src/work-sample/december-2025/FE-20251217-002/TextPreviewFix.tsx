import { useState } from 'react'

export const TextPreview = () => {
  const [message, setMessage] = useState('')

  // 単体コンポーネントだから、useCallbackは不要
  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="テキストを入力してください"
      />
      <p>入力中のテキスト：{message}</p>
    </div>
  )
}
