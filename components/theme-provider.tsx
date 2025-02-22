"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = React.useState(1);

  React.useEffect(() => {
    setCurrentTheme(1); 
  }, []);

  const cycleTheme = () => {
    setCurrentTheme((prev) => (prev % 4) + 1);
  };

  return (
    <NextThemesProvider {...props}>
      <div className={`theme-${currentTheme} theme-transition min-h-screen`}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child) ? React.cloneElement(child, { cycleTheme } as any) : child
        )}
      </div>
    </NextThemesProvider>
  );
}
