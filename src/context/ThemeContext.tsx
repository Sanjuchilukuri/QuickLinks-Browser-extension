import { ReactNode, useState, createContext, useEffect } from "react";
import { Themes } from "../constants";

interface IThemeContext {
  currentTheme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  currentTheme: Themes.dark,
  toggleTheme: () => {},
});

export default function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [currentTheme, SetTheme] = useState(Themes.dark);

  useEffect(() => {
    chrome.storage?.local.get(["theme"], (result) => {
      if (result.theme) {
        SetTheme(result.theme);
      }
    });
  }, []);


  const toggleTheme = () => {
    SetTheme((prevTheme) => {
      const newTheme = prevTheme === Themes.light ? Themes.dark : Themes.light;
      chrome.storage.local.set({ theme: newTheme }); 
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}