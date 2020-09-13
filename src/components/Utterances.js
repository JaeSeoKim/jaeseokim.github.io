import React, { useEffect, useContext } from "react"
import ThemeContext from "../lib/context/ThemContext"

const src = "https://utteranc.es/client.js"
const DARK_THEME = "github-dark"
const LIGHT_THEME = "github-light"

const Utterances = ({ repo }) => {
  const rootElm = React.createRef()
  const { isDarkMode } = useContext(ThemeContext)

  useEffect(() => {
    const utterances = document.createElement("script")
    const utterancesConfig = {
      src,
      repo,
      theme: isDarkMode ? DARK_THEME : LIGHT_THEME,
      label: "💬Comment",
      async: true,
      "issue-term": "title",
      crossorigin: "anonymous",
    }

    Object.keys(utterancesConfig).forEach((configKey) => {
      utterances.setAttribute(configKey, utterancesConfig[configKey])
    })
    if (rootElm.current) {
      rootElm.current.innerHTML = ""
      rootElm.current.appendChild(utterances)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode])

  return <div className="utterances" ref={rootElm} />
}

export default Utterances
