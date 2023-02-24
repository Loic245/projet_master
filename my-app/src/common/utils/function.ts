export const a11yProps = (index: number) => {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  };

export type SnackBarSeverity = 'success' | 'warning' | 'info' | 'error';