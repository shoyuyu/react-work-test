import { useEffect } from 'react'

export const MountLogger: React.FC = () => {
  useEffect(() => {
    console.log('mounted')
  }, []) // 初回マウント時に1回だけ実行
  return <p>MountLoggerコンポーネントがマウントされました</p>
}
