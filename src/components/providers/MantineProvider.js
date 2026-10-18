import { MantineProvider } from '@mantine/core';
import { appTheme } from '../../theme';

export function AppMantineProvider({ children }) {
  return (
    <MantineProvider
      theme={appTheme}
      withGlobalStyles
      withNormalizeCSS
    >
      {children}
    </MantineProvider>
  );
}
