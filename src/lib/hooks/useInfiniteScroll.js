import { useEffect } from "react"

const useInfiniteScroll = (callBack, ref) => {
  useEffect(() => {
    let oBserver
    if (ref.current) {
      oBserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          callBack()
        })
      })
      oBserver.observe(ref.current)
    }
    return () => oBserver && oBserver.disconnect()
  }, [ref, callBack])
}

export default useInfiniteScroll
