import { NavLink } from "react-router-dom";

const Navbar = () => {
    return ( 
        <div className="flex justify-between items-center px-3 py-3 bg-[#1a1a1a] text-[#ece9e7]">
            <h1 className="text-2xl font-semibold">Job Application</h1>
            <div className="flex items-center gap-4">
                <NavLink to="/"
                    className={({ isActive }) =>
                   isActive ? "text-[#4fb0f4] p-1 rounded-md bg-[#262626] transition-colors":"text-[#ece9e7] transition-colors"
                    }
                >
                 Dashboard
                </NavLink>
                <NavLink to="/applications"
                   className={({ isActive }) =>
                   isActive ? "text-[#4fb0f4] p-1 rounded-md bg-[#262626] transition-colors":"text-[#ece9e7] transition-colors"
                    }
                >
                 Applications
                </NavLink>
                <NavLink to="/settings"
                   className={({ isActive }) =>
                   isActive ? "text-[#4fb0f4] p-1 rounded-md bg-[#262626] transition-colors":"text-[#ece9e7] transition-colors"
                    }
                >
                 Settings
                </NavLink>
            </div>
        </div>
     );
}
 
export default Navbar;