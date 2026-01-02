import { useEffect, useState } from 'react'

interface MessageProps {
  text: string
}

export const Message = ({ text }: MessageProps) => {
  const [message, setMessage] = useState<string>('')

  // propsのtextが変わったら、ローカルstate（message）に反映する
  useEffect(() => {
    setMessage(text)
  }, [text])

  return (
    <div>
      <p>{message}</p>
    </div>
  )
}
