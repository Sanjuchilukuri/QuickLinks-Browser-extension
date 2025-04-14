import { FiSun } from "react-icons/fi";
import { LuSunMoon } from "react-icons/lu";
import { UseTheme } from "../../Hooks/UseTheme";
import { Themes } from "../../constants";

function Header() {

  const {currentTheme, toggleTheme} = UseTheme();

  return (
    <div className="d-flex flex-column gap-2 mx-4">
        <div className="text-primary d-flex justify-content-between align-items-center">
            <h3 >Quick Links</h3>
            <span className="fs-3 cursor-pointer" onClick={() => {toggleTheme()}}>
              { currentTheme == Themes.dark ?
                <FiSun />
                :<LuSunMoon />
              }
            </span>
        </div>
        <div>
            <p className="text-secondary">Save and manage your quick links.</p>
        </div>
    </div>
  )
}

export default Header