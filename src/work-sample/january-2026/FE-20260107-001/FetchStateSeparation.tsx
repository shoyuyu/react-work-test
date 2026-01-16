import { useState } from 'react'

// APIのデータ構造を型定義
type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export const FetchStateSeparation = () => {
  const [data, setData] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    setIsLoading(true)
    // fetch開始時に前のデータをクリア
    // これにより、エラーと古いデータが同時に表示されない
    setError(null)
    setData(null)

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const result: Post = await res.json()
      setData(result)
    } catch (e) {
      setError('データの取得に失敗しました')
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <dl>
          <dt>{data.title}</dt>
          <dd>{data.body}</dd>
        </dl>
      )}
    </div>
  )
}
