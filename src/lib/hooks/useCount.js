import { useState, useEffect, useRef } from "react"

const useCount = () => {
  const initialCount =
    typeof window !== `undefined` ? window.sessionStorage.getItem("count") : 1
  const [count, setCount] = useState(Number(initialCount))
  const countRef = useRef(count)
  const increaseCount = () => setCount((prev) => prev + 1)

  useEffect(() => {
    countRef.current = count
    window.sessionStorage.setItem("count", count)
  }, [count])

  return [count, countRef, increaseCount]
}

export default useCount
