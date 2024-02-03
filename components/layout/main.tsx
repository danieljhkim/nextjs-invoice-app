import * as React from 'react';
import SideNav from '../sideNav'
import { ColorModeContext } from '../../config/color-context';
import { useTheme } from '@mui/material/styles';
import styles from './layout.module.css';
import { Box } from '@mui/material';

export default function Layout({ children }:{
  children: React.ReactNode
}) {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <>
      <Box>
        <SideNav theme={theme} colorMode={colorMode} />
      </Box>
      <Box sx={{ ml:"100px" }}>
        {children}
      </Box>
    </>
  )
}