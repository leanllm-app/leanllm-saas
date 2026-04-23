'use client';

import { ThemeProvider } from 'next-themes';

type MarketingThemeProviderProps = React.PropsWithChildren;

export function MarketingThemeProvider({
  children,
}: MarketingThemeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
