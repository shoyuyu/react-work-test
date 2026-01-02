export const SimpleCondition = () => {
  const isVisible = true

  // &&：trueの時だけ表示
  return <div>{isVisible && <p>表示されています</p>}</div>
}
