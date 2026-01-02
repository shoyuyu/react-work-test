export const SimpleCondition = () => {
  const isVisible = true

  // ?：true/falseを両方扱う
  return <div>{isVisible ? <p>表示されています</p> : <p>非表示です</p>}</div>
}
