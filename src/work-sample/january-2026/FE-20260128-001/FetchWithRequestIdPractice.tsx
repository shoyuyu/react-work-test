import { useRef, useState } from 'react'

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export const FetchWithRequestIdPractice = () => {
  const [data, setData] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 最新リクエストを識別するためのID
  const requestIdRef = useRef(0)

  // requestIdを発行して返す（リクエスト毎に一意のIDを生成）
  const nextRequestId = () => {
    requestIdRef.current += 1
    return requestIdRef.current
  }

  // 現在の処理が最新かを判定
  const isLatest = (id: number) => id === requestIdRef.current

  const clearData = () => {
    setData(null)
    setError(null)
  }

  const fetchPost = async () => {
    const reqId = nextRequestId()

    setIsLoading(true)
    setError(null)

    try {
      // 体感用：毎回違う結果になりやすいよう、idをランダムにする
      const randomId = Math.floor(Math.random() * 50) + 1

      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`)
      if (!res.ok) throw new Error('Fetch failed')

      const json: Post = await res.json()

      // 古いリクエスト結果は捨てる
      if (!isLatest(reqId)) return

      setData(json)
    } catch (e) {
      if (!isLatest(reqId)) return
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      if (!isLatest(reqId)) return

      setIsLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h2>Fetch with requestId guard</h2>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={fetchPost} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Fetch'}
        </button>
        <button onClick={clearData} disabled={!data}>
          Clear
        </button>
      </div>

      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}

      {data ? (
        <article style={{ border: '1px solid #ccc', padding: 12, borderRadius: 8 }}>
          <p>
            <strong>#{data.id}</strong> {data.title}
          </p>
          <p>{data.body}</p>
        </article>
      ) : (
        <p>No data</p>
      )}

      <p style={{ fontSize: 12, opacity: 0.7 }}>
        Tip: 連打しても「最後に押した結果」だけが表示されればOK
      </p>
    </div>
  )
}
