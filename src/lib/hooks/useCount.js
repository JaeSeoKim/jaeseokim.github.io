import { useState, useEffect, useRef } from "react"

const useCount = (path) => {
  const initialCount =
    typeof window !== `undefined`
      ? window.sessionStorage.getItem(`${path}_count`)
      : 1
  const [count, setCount] = useState(Number(initialCount))
  const countRef = useRef(count)
  const increaseCount = () => setCount((prev) => prev + 1)

  useEffect(() => {
    countRef.current = count
    window.sessionStorage.setItem(`${path}_count`, count)
  }, [count, path])

  return [count, countRef, increaseCount]
}

export default useCount
