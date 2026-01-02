import { useState } from 'react'

export const NumberStateView = () => {
  const [value] = useState<number>(0)

  return <div>{value}</div>
}
