import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

export default function TemporaryDrawer({ children, toggle, state }: { 
    children: React.ReactNode, 
    toggle: any,
    state: any
  }) {

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggle(false)}
        >
          <Box
            sx={{ width: 700 }}
            role="presentation"
          >
            {children}
          </Box>
         
        </Drawer>
      </React.Fragment>
    </div>
  );
}