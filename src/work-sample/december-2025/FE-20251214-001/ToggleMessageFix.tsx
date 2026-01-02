import { useState } from 'react'

interface ToggleMessageProps {
  message?: string
}

export const ToggleMessage = ({ message }: ToggleMessageProps) => {
  const [isVisible, setIsVisible] = useState(false)

  /*
   * useCallback は「今は不要」
   * ・子コンポーネントに props として渡す：使う
   * ・memo 化した子がある：使う
   * ・単体コンポーネント内：不要
   * */

  /* const handleClick = useCallback(() => {
    setIsVisible(prev => !prev)
  }, []) */

  return (
    <div>
      <button onClick={() => setIsVisible(v => !v)}>
        {isVisible ? 'Hide Message' : 'Show Message'}
      </button>

      {isVisible && <p>{message ?? 'Hello, React + TypeScript!'}</p>}
    </div>
  )
}
