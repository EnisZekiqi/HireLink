
import { useEffect, useState } from "react";
import { IoMdSunny,IoIosMoon  } from "react-icons/io";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

 useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
 }, [theme]);
   useEffect(() => {
    // Apply the theme to <html> immediately
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

    return ( 
      <div className="toggle-switch" onClick={toggleTheme}>
        <label className="switch-label">
          <input 
            type="checkbox" 
            className="checkbox" 
            checked={theme !== "dark"} 
            onChange={toggleTheme} 
          />
          <span className="slider"></span>
        </label>
      </div>  
    );
}
 
export default ThemeToggle;