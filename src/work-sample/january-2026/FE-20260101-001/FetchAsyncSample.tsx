import { useEffect, useState, useRef } from 'react'

export const FetchAsyncSample = () => {
  const [executeFetch, setExecuteFetch] = useState(false)
  const [data, setData] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // useRef<AbortController>でfetchをキャンセル可能にする
  const abortController = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!executeFetch) return // ボタンが押されていなければ何もしない

    // async関数を定義
    const fetchData = async () => {
      // 連続クリック時も前のfetchをキャンセルして最新のみ実行
      if (abortController.current) {
        abortController.current.abort()
      }

      abortController.current = new AbortController()

      setLoading(true) // ローディング開始
      setError(null)

      try {
        // サーバにリクエストを送る（awaitで結果を待つ）
        const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
          signal: abortController.current.signal,
        })

        // エラーチェック
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        // レスポンスをJSON形式で取得（awaitで待つ）
        const result = await res.json()
        // 取得したデータを整形してstateに保存
        setData(JSON.stringify(result, null, 2))
      } catch (e) {
        // キャンセルは正常な処理なので無視
        if (e instanceof Error && e.name === 'AbortError') {
          return
        }
        setError(e instanceof Error ? e : new Error('Unknown error'))
      } finally {
        setLoading(false) // ローディング終了
        setExecuteFetch(false)
      }
    }

    fetchData()

    // cleanup関数でabort()を呼び、アンマウント時に停止
    return () => {
      if (abortController.current) {
        abortController.current.abort()
      }
    }
  }, [executeFetch]) // fetchが変わるたびに実行

  const handleClick = () => {
    setExecuteFetch(true)
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <pre>{data}</pre>}
    </div>
  )
}
