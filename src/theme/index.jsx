import React, { useMemo } from 'react'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css
} from 'styled-components'
import { useIsDarkMode } from '../hooks/user'

const white = '#FFFFFF'
const black = '#000000'
const red = "#d40000"


export function colors(darkMode) {
  return {
    //color name
    white,
    black,
    red,

    //main
    primary: darkMode ? "#0779e4" : black,
    secodery: darkMode ? "#c6c6c6" : black,
    success: darkMode ? "#00AA00" : black,
    warning: darkMode ? "#d40000" : black,

    //text
    text1: darkMode ? white : black,
    text1_2: darkMode ? black : white,
    text2: darkMode ? "#c6c6c6" : black,

    //border
    border1: darkMode ? "#1C1C1C" : "#c6c6c6",
    border2: darkMode ? "#101010" : "#c6c6c6",

    //bg
    bg1: darkMode ? black : "#d4d3d3",
    bg2: darkMode ? "#340000" : "#fff",
    bg3: darkMode ? "#0d0d0d" : "#fff",
    bg4: darkMode ? "#242424" : "#d4d3d3",
    bg5: darkMode ? "#171717" : "#d4d3d3",
    bg6: darkMode ? "#111111" : "#d4d3d3",

    sync_active: darkMode ? 'linear-gradient(90deg, #5BB0FF -0.01%, #EA2C62 93.44%)' : "linear-gradient(90deg, #5BB0FF -0.01%, #EA2C62 93.44%)",
    sync_dactive: darkMode ? 'rgb(28, 28, 28)' : "rgb(200, 28, 28)",

    //gradinant
    grad1: darkMode ? 'linear-gradient(90deg, #5BB0FF -0.01%, #ea2c62 93.44%)' : 'linear-gradient(90deg, #5BB0FF -0.01%, #ea2c62 93.44%)',
    grad2: darkMode ? "linear-gradient(135deg, rgba(91, 204, 189, 0.14902) 0%, rgba(97, 192, 191, 0.14902) 33.33%, rgba(85, 188, 200, 0.14902) 74.49%, rgba(105, 207, 184, 0.14902) 100%)" : "rgba(105, 207, 184, 0.14902)",
    grad3: darkMode ? "linear-gradient(247.41deg, #A2FBB0 16.32%, #5EC4D6 87.6%);" : "rgba(105, 207, 184, 0.14902)",

    //label
    label_primary: darkMode ? "#0779e4" : "rgb(28, 28, 28)",
    label_warning: "#d40000",

  }
}

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280
}

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ; (accumulator)[size] = (a, b, c) => css`
      @media (max-width: ${(MEDIA_WIDTHS)[size]}px) {
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
  background: radial-gradient(49.81% 49.81% at 50% 49.81%, #272727 0%, #000000 100%);
}
a{
      color: inherit;
}
body {
  min-height: 100vh;
}
`