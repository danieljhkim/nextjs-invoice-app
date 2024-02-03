import * as React from 'react';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent | undefined) => {
      if (
        event?.type === 'keydown' &&
        ((event as React.KeyboardEvent)?.key === 'Tab' ||
          (event as React.KeyboardEvent)?.key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, left: open });
    };
  return {
    toggleDrawer: toggleDrawer,
    drawerState: state
  }

}