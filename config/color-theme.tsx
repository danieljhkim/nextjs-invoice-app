import { PaletteMode } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#7c5dfa',
            light: '#9277FF',
            dark: '#1e2139'
          },
          divider: "#252945",
          text: {
            primary: "#0c0e16",
            secondary: "#252945",
          },
          background: {
            default: '#7e88c3',
            paper: "#1e2139",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#7c5dfa',
            light: '#9277FF',
            dark: '#1e2139'
          },
          divider: "#252945",
          background: {
            default: "#0c0e16",
            paper: "#1e2139",
          },
          text: {
            primary: "#f8f8fb",
            secondary: "#dfe3fa",
          },
        }),
  },
});