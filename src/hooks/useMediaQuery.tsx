import { useEffect, useState } from "react"

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    const onResize = () => setMatches(media.matches)

    setMatches(media.matches)

    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [query, matches])

  return matches
}

export {
  useMediaQuery
}