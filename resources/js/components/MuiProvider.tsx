import { createTheme, alpha, getContrastRatio, StyledEngineProvider } from "@mui/material/styles";
// import { ThemeProvider, CssBaseline } from '@mui/material'
import ThemeProvider  from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useRef, useState } from "react";
import { SnackbarProvider } from "notistack";

const blackBase = '#27272a';
const blackMain = alpha(blackBase, 0.7);

const whiteBase = '#fff';
const whiteMain = alpha(whiteBase, 0.7);

const grayBase = '#eaeff4';
const grayMain = alpha(grayBase, 0.7);

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    // @ts-ignore
    black: {
      main: blackMain,
      light: alpha(blackBase, 0.5),
      dark: alpha(blackBase, 0.9),
      contrastText: getContrastRatio(blackMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    white: {
      main: whiteMain,
      light: alpha(whiteBase, 0.5),
      dark: alpha(whiteBase, 0.9),
      contrastText: getContrastRatio(whiteMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    gray: {
      main: grayMain,
      light: alpha(grayBase, 0.5),
      dark: alpha(grayBase, 0.9),
      contrastText: getContrastRatio(grayMain, '#fff') > 4.5 ? '#fff' : '#111',
    }
  },
  typography: {
    fontFamily: ''
    // fontFamily: `${roboto.style.fontFamily}, ${nunito.style.fontFamily}`
  }
})


const MuiProvider: React.FC<{
  children: React.ReactNode
}> = ({children}) => {


  useEffect(() => {
    // import("@lottiefiles/lottie-player")
  },[])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3} autoHideDuration={1500} anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default MuiProvider


declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    black: true,
    white: true,
    gray: true
  }

  interface IconButtonPropsColorOverrides {
    black: true,
    white: true,
    gray: true
  }

  interface SliderPropsColorOverrides {
    black: true,
    white: true,
    gray: true
  }
}