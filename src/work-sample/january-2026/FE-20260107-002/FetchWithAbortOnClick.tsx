import { useState, useRef } from 'react'

// APIのデータ構造を型定義
type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export const FetchWithAbortOnClick = () => {
  const [data, setData] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  // ロジックレベルの防御
  const abortControllerRef = useRef<AbortController | null>(null)

  const handleClick = async () => {
    // 前回のfetchが実行中なら中断
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    // 新しいAbortControllerを作成
    abortControllerRef.current = new AbortController()

    setIsLoading(true)
    setError(null)
    setData(null)

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        // signalプロパティにAbortControllerのsignal を渡すことで、fetchリクエストを途中でキャンセルできるようにする
        signal: abortControllerRef.current.signal,
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const result = await res.json()
      setData(result)
    } catch (e) {
      // AbortErrorは意図的な中断であるため無視
      if (e instanceof Error && e.name === 'AbortError') {
        return
      }
      setError(e instanceof Error ? e : new Error('Unknown error'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {/* UIレベルの防御 */}
      <button type="button" onClick={handleClick} disabled={isLoading}>
        データ取得
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      {data && (
        <dl>
          <dt>{data.title}</dt>
          <dd>{data.body}</dd>
        </dl>
      )}
    </div>
  )
}
