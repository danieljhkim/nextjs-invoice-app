import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from '../components/layout/main'
import { ColorModeContext } from '../config/color-context';
import { getDesignTokens } from '../config/color-theme'
import UserContext from '../hooks/useContext'
import invoiceData from '../config/data.json' assert { type: 'json' };
import { Item, Invoice } from '../models/interfaces/invoice';

export default function App({ Component, pageProps }: AppProps) {

  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const [invoices, setInvoices] = React.useState<Array<Invoice>>(invoiceData as Invoice[]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme(getDesignTokens(mode)),
    [mode],
  );

  return (
    <UserContext.Provider value={{invoices, setInvoices}}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline/> 
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </UserContext.Provider>
  );

}
