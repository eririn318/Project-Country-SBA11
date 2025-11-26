import { useTheme } from "../context/ThemeContext";

function NavBar() {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <nav>
      <div className="flex justify-between items-center md:flex">
        <h1>Where in the world?</h1>
        <button onClick={toggleDarkMode}>
          {/* <span> is inline container--It lets you group just the emoji separately from the text. */}
          <span>{darkMode ? "☀️" : "🌙"}</span>
          {/* In React, anything inside {} means "insert JavaScript here." */}
          {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
