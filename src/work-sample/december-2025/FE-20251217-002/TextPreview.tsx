import { useState, useCallback } from 'react'

export const TextPreview = () => {
  const [message, setMessage] = useState<string>('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }, [])

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="テキストを入力してください"
      />
      <p>入力中のテキスト：{message}</p>
    </div>
  )
}
