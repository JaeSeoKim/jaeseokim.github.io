/*global FB*/
import "tailwindcss/dist/base.min.css"

// polyfill
import "intersection-observer"
import smoothscroll from "smoothscroll-polyfill"

import React, { useState, useEffect, useCallback } from "react"
import ThemeContext from "./src/lib/context/ThemContext"
import metaConfig from "./gatsby-meta-config"

// kick off the polyfill!
smoothscroll.polyfill()

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

  const printCopyright = useCallback(() => {
    console.log(
      "%c%s",
      `
      background: linear-gradient(
        90deg,
        #7f7fd5, #86a8e7
      );
      padding: 0.5rem;
      border-radius: 0.25rem;
      color: #FFFFFF;
      font-size: 2.25rem;
      `,
      "JaeSeoKim's blog"
    )
    console.log(
      "%c%s",
      `
      padding: 0.25rem;
      border-radius: 0.25rem;
      background-color: #edf2f7;
      color: #3737B9;
      font-size: 1.5rem;
      `,
      "©JaeSeoKim"
    )
    console.log(
      "%c%s",
      `
      font-size: 1.25rem;
      `,
      "https://github.com/JaeSeoKim"
    )
  }, [])

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
      printCopyright()
    }
  }, [printCopyright])
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleThemMode }}>
      {element}
    </ThemeContext.Provider>
  )
}

export const wrapRootElement = ({ element }) => <Wrapper element={element} />
