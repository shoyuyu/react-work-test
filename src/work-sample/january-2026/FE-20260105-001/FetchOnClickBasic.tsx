import { useState } from 'react'

export const FetchOnClickBasic = () => {
  const [data, setData] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handleClick = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const result = await res.json()
      setData(JSON.stringify(result, null, 2))
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Unknown error'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <button type="button" onClick={handleClick} disabled={isLoading}>
        データを取得
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && !isLoading && !error && <pre>{data}</pre>}
    </div>
  )
}
