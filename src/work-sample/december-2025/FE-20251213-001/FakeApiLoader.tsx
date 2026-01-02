import { useState, useEffect } from 'react'

interface FakeApiLoaderProps {
  initialData?: string
}

export const FakeApiLoader = ({ initialData = 'Loading...' }: FakeApiLoaderProps) => {
  // propsは初期値としてのみ使用
  const [data, setData] = useState<string>(initialData)

  useEffect(() => {
    // 2秒後に処理を実行
    const timer = setTimeout(() => {
      setData('Hello, React!')
    }, 2000)

    // クリーンアップ関数
    return () => clearTimeout(timer)
  }, []) // 初回マウント時に1回だけ実行

  return <div>{data}</div>
}
