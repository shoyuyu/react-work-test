import { useState, useRef } from 'react'

// APIのデータ構造を型定義
type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export const FetchWithRequestIdGuard = () => {
  const [data, setData] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // リクエスト毎に発行するID
  const reqId = useRef<number>(0)

  const handleClick = async () => {
    // 新しいリクエストIDを発行（インクリメント）
    reqId.current += 1
    const currentReqId = reqId.current

    setIsLoading(true)
    setError(null)
    setData(null)

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')

      // レスポンス取得後、リクエストIDが最新かチェック（ボタン連打の複数リクエストの際に、古いリクエストをキャンセルして最新を取得）
      if (currentReqId !== reqId.current) {
        return // 古いリクエストの場合は無視
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const result: Post = await res.json()
      setData(result)
    } catch (e) {
      // 非同期処理はどこで時間がかかるか分からないため、各ステップでチェックをする
      // エラー時も最新のリクエストかチェック
      if (currentReqId !== reqId.current) {
        return
      }
      setError(e instanceof Error ? e : new Error('Unknown error'))
    } finally {
      // finally内でも最新のリクエストかチェック
      if (currentReqId !== reqId.current) {
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
