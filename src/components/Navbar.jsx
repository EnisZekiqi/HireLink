import { NavLink } from "react-router-dom";
import { CiSettings,CiHome,CiFileOn   } from "react-icons/ci";

const Navbar = () => {
    return ( 
        <div className="flex justify-between items-center px-3 py-3 ">
            <h1 className="text-2xl font-semibold">HireLink</h1>
            <div className="flex items-center gap-4">
                <NavLink to="/"
                    className={({ isActive }) =>
                   isActive ? "dark:text-[#4fb0f4] p-1 rounded-md bg-[#eff0f1] dark:bg-[#181a1b] transition-colors duration-300":"text-[#232729] dark:text-[#fbfbfb] transition-colors duration-300"
                    }
                >
                    <div className="flex flex-col items-center">
                        <div className="flex items-center"><p className="hidden md:block">Dashboard</p> <CiHome className="block md:hidden w-[20px] h-[20px]" /></div>
                        <span className={({ isActive }) =>
                        isActive ? "block w-full h-1 bg-[#4fb0f4] transition-colors duration-300":"hidden"
                        }></span>
                    </div>
                </NavLink>
                <NavLink to="/applications"
                   className={({ isActive }) =>
                   isActive ? "dark:text-[#4fb0f4] p-1 rounded-md bg-[#eff0f1] dark:bg-[#181a1b]   transition-colors duration-300":"text-[#232729] dark:text-[#fbfbfb] transition-colors duration-300"
                    }
                >
                    <div className="flex flex-col items-center">
                        <div className="flex items-center"><p className="hidden md:block">Application</p> <CiFileOn className="block md:hidden w-[20px] h-[20px]"/></div>
                        <span className={({ isActive }) =>
                        isActive ? "block w-full h-1 text-[#4fb0f4] transition-colors duration-300":"hidden"
                        }></span>
                    </div>
                </NavLink>
                <NavLink to="/settings"
                   className={({ isActive }) =>
                   isActive ? "dark:text-[#4fb0f4] p-1 rounded-md bg-[#eff0f1] dark:bg-[#181a1b]   transition-colors duration-300":"text-[#232729] dark:text-[#fbfbfb] transition-colors duration-300"
                    }
                >
                    <div className="flex flex-col items-center">
                        <div className="flex items-center"><p className="hidden md:block">Settings</p> <CiSettings className="block md:hidden w-[20px] h-[20px]"/></div>
                        <span className={({ isActive }) =>
                        isActive ? "block w-full h-1 bg-[#4fb0f4] transition-colors duration-300":"hidden"
                        }></span>
                    </div>
                </NavLink>
            </div>
        </div>
     );
}
 
export default Navbar;