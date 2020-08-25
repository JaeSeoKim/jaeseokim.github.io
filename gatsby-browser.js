/*global FB*/
import "tailwindcss/dist/base.min.css"

// polyfill
import "intersection-observer"

import React, { useState, useEffect } from "react"
import ThemeContext from "./src/lib/context/ThemContext"
import metaConfig from "./gatsby-meta-config"

export const onInitialClientRender = () => {
  if (metaConfig.share.facebookAppId) {
    window.fbAsyncInit = function () {
      FB.init({
        appId: metaConfig.share.facebookAppId,
        xfbml: true,
        version: "v3.2",
      })
      FB.AppEvents.logPageView()
    }
    ;(function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = "https://connect.facebook.net/en_US/sdk.js"
      fjs.parentNode.insertBefore(js, fjs)
    })(document, "script", "facebook-jssdk")
  }
}

const Wrapper = ({ element }) => {
  const [isDarkMode, setDarkMode] = useState(false)

  const toggleThemMode = () => {
    setDarkMode(!isDarkMode)
    if (!isDarkMode) {
      localStorage.setItem("isDarkMode", "true")
    } else {
      localStorage.setItem("isDarkMode", "false")
    }
  }

  useEffect(() => {
    if (window) {
      try {
        const mode = localStorage.getItem("isDarkMode")
        if (mode === "true") {
          setDarkMode(true)
        } else {
          setDarkMode(false)
        }
      } catch (error) {
        localStorage.setItem("isDarkMode", "false")
      }
    }
  }, [])
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleThemMode }}>
      {element}
    </ThemeContext.Provider>
  )
}

export const wrapRootElement = ({ element }) => <Wrapper element={element} />

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}
