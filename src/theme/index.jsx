import React, { useMemo } from 'react'
import {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css
} from 'styled-components'
import { useIsDarkMode } from '../hooks/user'

const white = '#FFF'
const black = '#000'
const red = "#d40000"

export function colors(darkMode) {
  return {
    //color name
    white,
    black,
    red,

    //main
    primary: "#0779e4",
    secondary: "#c6c6c6",
    success: "#00AA00",
    warning: "#FF5555",

    //text
    text1: white,
    text1_2: black,
    text2: "#c6c6c6",


    //border
    border1: "#1C1C1C",
    border2: darkMode ? "#101010" : "#101010",

    //bg
    bg1: black,
    bg2: darkMode ? "#340000" : "#340000",
    bg3: darkMode ? "#0d0d0d" : "#0d0d0d",
    bg4: darkMode ? "#242424" : "#242424",
    bg5: darkMode ? "#171717" : "#171717",
    bg6: darkMode ? "#111111" : "#111111",
    bg7: darkMode ? "#272727" : "#272727",
    bg8: darkMode ? "#E7E8EA" : "#E7E8EA",
    bg9: "#1e2427",

    bg_muon: darkMode ? "#F6F6F6" : "#F6F6F6",
    bg_blue: "#5F5CFE",
    bg_bridge: "#2891f9",
    bg_warning: "rgba(255, 85, 85, 0.2)",

    sync_active: darkMode ? 'linear-gradient(90deg, #5BB0FF -0.01%, #EA2C62 93.44%)' : "linear-gradient(90deg, #5BB0FF -0.01%, #EA2C62 93.44%)",
    deactivated: 'rgb(28, 28, 28)',

    //gradient
    grad1: darkMode ? 'linear-gradient(90deg, #5BB0FF -0.01%, #ea2c62 93.44%)' : 'linear-gradient(90deg, #5BB0FF -0.01%, #ea2c62 93.44%)',
    grad2: darkMode ? "linear-gradient(135deg, rgba(91, 204, 189, 0.14902) 0%, rgba(97, 192, 191, 0.14902) 33.33%, rgba(85, 188, 200, 0.14902) 74.49%, rgba(105, 207, 184, 0.14902) 100%)" : "rgba(105, 207, 184, 0.14902)",
    grad3: darkMode ? "linear-gradient(247.41deg, #A2FBB0 16.32%, #5EC4D6 87.6%);" : "rgba(105, 207, 184, 0.14902)",
    grad4: darkMode ? "linear-gradient(90deg, #DFF4FE 0%, #8EB5FF 100%)" : "linear-gradient(90deg, #DFF4FE 0%, #8EB5FF 100%)",
    grad5: darkMode ? "linear-gradient(135deg, rgba(91, 204, 189, 0.14902) 0%, rgba(97, 192, 191, 0.14902) 33.33%, rgba(85, 188, 200, 0.14902) 74.49%, rgba(105, 207, 184, 0.14902) 100%)" : "linear-gradient(90deg, #DFF4FE 0%, #8EB5FF 100%)",
    grad_dei: darkMode ? "linear-gradient(90deg, #30EFE5 0%, #0DB0F4 100%)" : "linear-gradient(90deg, #30EFE5 0%, #0DB0F4 100%)",

    //label
    label_primary: "#0779e4",
    label_warning: "#FF5555",

    ChainId: {
      1: "#4169e1",
      4: "#FFA500",
      10: "#FF0000",
      56: "#e7bd24",
      97: "#e7bd24",
      137: "#7951DD",
      250: "#367cfd",
      1088: "#aafffe",
      42161: "#2d374b",
    },

    ChainId_text: {
      1: "#FFF",
      4: "#FFF",
      10: "#FFF",
      56: "#000",
      97: "#000",
      137: "#FFF",
      250: "#FFF",
      1088: "#000",
      42161: "#29a0f0",
    }
  }
}

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
  upToExtraLarge: 1500
}

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ; (accumulator)[size] = (a, b, c) => css`
      @media screen and (max-width: ${(MEDIA_WIDTHS)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
)


export function theme(darkMode) {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    // media queries
    mediaWidth: mediaWidthTemplates,
  }
}

export default function ThemeProvider({ children }) {
  const darkMode = useIsDarkMode()
  const themeObject = useMemo(() => theme(darkMode), [darkMode])
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: Monument Grotesk,'Inter', sans-serif;
  font-weight: 400;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
    text-decoration: none;
 }
button {
  user-select: none;
}
html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  /* background-color: ${({ theme }) => theme.bg1}; */
  background: radial-gradient(49.81% 49.81% at 50% 49.81%, #272727 0%, #000 100%);
}
a{
      color: inherit;
}
ul{
  list-style: none;
}
body {
  min-height: 100vh;
}
`