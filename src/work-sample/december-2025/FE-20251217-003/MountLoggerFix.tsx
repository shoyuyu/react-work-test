import { useEffect } from 'react'

// React.FC は使わなくてもいい
// children を暗黙に持たせたくない
export const MountLogger = () => {
  useEffect(() => {
    console.log('mounted')
  }, []) // 初回マウント時に1回だけ実行
  return <p>MountLoggerコンポーネントがマウントされました</p>
}
