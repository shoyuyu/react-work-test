import { useState } from 'react'

export const InitialStateView = () => {
  const [text] = useState<string>('初期値です')

  return <div>{text}</div>
}
