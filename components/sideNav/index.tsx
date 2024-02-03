'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Image from 'next/image'
import IconButton from '@mui/material/IconButton';

const drawerWidth = 100;

export default function PermanentDrawerLeft({ colorMode, theme }:{
  theme: any,
  colorMode: any
}) {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: "column" , 
            justifyContent: 'space-between' ,
            alignItems: 'center',
            height: "100%",
          }}
        >
          <Box sx={{ p: 3, background: '#7c5dfa'}}>
            <Image 
              src="/assets/logo.svg"
              width="50"
              height="50"
              alt="logo"
            />
          </Box>
          <Box>

            <IconButton sx={{ mb: 4 }} onClick={colorMode?.toggleColorMode} color="inherit">
              {theme?.palette?.mode === 'dark' ? 
                <Image width="25" height="25" src="/assets/icon-moon.svg" alt="moon" /> 
                  : 
                <Image width="25" height="25" src="/assets/icon-sun.svg" alt="sun" />
              }
            </IconButton>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Image width="25" height="25" src="/assets/image-avatar.jpg" alt="avatar" /> 
            </Box>
          </Box>
        </Box>

      </Drawer>
    </Box>
  );
}