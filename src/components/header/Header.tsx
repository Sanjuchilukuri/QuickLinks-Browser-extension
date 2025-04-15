import { FiSun } from "react-icons/fi";
import { LuSunMoon } from "react-icons/lu";
import { UseTheme } from "../../Hooks/UseTheme";
import { Themes } from "../../constants";
import UseAuth from "../../Hooks/UseAuth";
import { FiLogOut } from "react-icons/fi";

function Header() {

  const {currentTheme, toggleTheme} = UseTheme();
  const {isAuthenticated, user, logOut} = UseAuth();

  return (
    <div className="d-flex flex-column gap-2 mx-2">
        <div className="text-primary d-flex justify-content-between align-items-center">
            <h3 >Quick Links</h3>
            <div >
              <span className="fs-3 cursor-pointer" onClick={() => {toggleTheme()}}>
                { currentTheme == Themes.dark ?
                  <FiSun />
                  :<LuSunMoon />
                }
              </span>
              {isAuthenticated &&
                <span className="ms-3">
                  <span className="text-primary">Hi, {user.userName }</span>
                  <span className="ms-2 fs-4 text-link cursor-pointer" onClick={()=>logOut()}><FiLogOut /></span>
                </span>
              }
            </div>
        </div>
        <div>
            <p className="text-secondary">Save and manage your quick links.</p>
        </div>
    </div>
  )
}

export default Header