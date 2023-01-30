import { createContext, useEffect, useState } from "react";

interface AppContextProps {
  theme?: string;
  changeTheme?: () => void;
}

const AppContext = createContext<AppContextProps>({});

export function AppProvider(props) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const previousTheme = localStorage.getItem("theme");
    setTheme(previousTheme);
  }, []);

  const changeTheme = () => {
    const newTheme = theme ? "" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <AppContext.Provider value={{ theme, changeTheme }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
