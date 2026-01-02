import { useState, useCallback } from 'react'

interface ToggleMessageProps {
  message?: string
}

export const ToggleMessage = ({ message }: ToggleMessageProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const handleClick = useCallback(() => {
    // prev => !prevは、今の状態を反転させる
    setIsVisible(prev => !prev) // prevは「いまの状態のtrue/false」が入る。!prevは「いまの状態の反対でprevがfalseなら!prevはtrue」
  }, [])

  return (
    <div>
      <button onClick={handleClick}>{isVisible ? 'Hide Message' : 'Show Message'}</button>
      {isVisible && <p>{message ?? 'Hello, React + TypeScript!'}</p>}
    </div>
  )
}
