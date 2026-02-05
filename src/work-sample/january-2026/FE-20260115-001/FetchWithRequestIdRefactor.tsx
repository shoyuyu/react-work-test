import { useState, useRef } from 'react'

// APIのデータ構造を型定義
type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export const FetchWithRequestIdRefactor = () => {
  const [data, setData] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // リクエストIDを管理するref
  const reqId = useRef<number>(0)

  // 新しいリクエストIDを発行して返す
  const getNextRequestId = (): number => {
    reqId.current += 1
    return reqId.current
  }

  // 指定されたIDが最新のリクエストかどうかを判定
  const isLatestRequest = (id: number): boolean => {
    return id === reqId.current
  }

  const handleClick = async () => {
    const currentReqId = getNextRequestId()

    setIsLoading(true)
    setError(null)
    setData(null)

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')

      // レスポンス取得後、最新のリクエストかチェック
      if (!isLatestRequest(currentReqId)) {
        return
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const result: Post = await res.json()
      setData(result)
    } catch (e) {
      // 非同期処理はどこで時間がかかるか分からないため、各ステップでチェックをする
      // エラー時も最新のリクエストかチェック
      if (!isLatestRequest(currentReqId)) {
        return
      }
      setError(e instanceof Error ? e : new Error('Unknown error'))
    } finally {
      // finally内でも最新のリクエストかチェック
      if (!isLatestRequest(currentReqId)) {
        return
      }
      setIsLoading(false)
    }
  }

  return (
    <div>
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
