import { NavLink } from "react-router-dom";

const Navbar = () => {
    return ( 
        <div className="flex justify-between px-2 py-1 text-[#000]">
            <h1 className="text-2xl font-semibold">Job Application</h1>
            <div className="flex items-center gap-2">
                <NavLink to="/">
                 Dashboard
                </NavLink>
                  <NavLink to="/applications">
                 Applications
                </NavLink>
                  <NavLink to="/settings">
                 Settings
                </NavLink>
            </div>
        </div>
     );
}
 
export default Navbar;