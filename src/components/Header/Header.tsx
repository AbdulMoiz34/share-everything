import { NavLink } from "react-router-dom";
import { Tooltip } from "antd";
import Logo from "../Logo";
import { FaBars, FaGithub } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { auth, signOut } from "../../firebase";
import toast from "react-hot-toast";
import LogoutBtn from "../LogoutBtn";

const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-blue-500';
}

const Header = () => {
    const { user, setUser } = useContext(AuthContext);
    const [isMenuOpen, setIsOpenMenu] = useState<boolean>(false);

    const id: string | null = localStorage.getItem("id");

    const logoutHandler = async () => {
        try {
            await signOut(auth);
            setUser(null);
            toast.success("Logged out.");
        } catch (_err) {
            toast.error("Logout failed. Please try again.");
        }
    }

    return (
        <div className="header-bar flex justify-between items-center">
            <div>
                <Logo />
            </div>
            <div className="relative">
                <button onClick={() => setIsOpenMenu(!isMenuOpen)} className="sm:hidden cursor-pointer hover:shadow hover:bg-blue-100 hover:text-blue-900 p-2 rounded-md">
                    <FaBars />
                </button>
                <div className={`${!isMenuOpen && "hidden"} px-${user ? "8" : "4"} left-[-150px] sm:hidden text-xs absolute top-2 py-2 rounded-md shadow z-10 bg-white`}>
                    <ul className="flex flex-col items-center gap-y-2">
                        <li>
                            <NavLink to={`${id ? `/view/${id}` : "/"}`} className={getNavLinkClass}>Home </NavLink>
                        </li>

                        <li>
                            <NavLink to="/howToUse" className={getNavLinkClass}>How to use it </NavLink>
                        </li>

                        <li className="text-blue-500 font-bold text-[14px] hover:text-blue-600">
                            {user ? <LogoutBtn logoutHandler={logoutHandler} /> : <NavLink to={"login"}>Login / Register</NavLink>}
                        </li>

                        <li className="text-gray-500 hover:text-blue-600">
                            <Tooltip placement="bottom" title="Github Profile">
                                <a href="https://github.com/AbdulMoiz34" target="_blank"><FaGithub size={25} /></a>
                            </Tooltip>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="hidden sm:block">
                <ul className="items-center justify-center text-sm flex gap-8 md:gap-12">
                    <li>
                        <NavLink to={`${id ? `/view/${id}` : "/"}`} className={getNavLinkClass}>Home </NavLink>
                    </li>
                    <li>
                        <NavLink to="/howToUse" className={getNavLinkClass}>How to use it </NavLink>
                    </li>

                    <li className="text-blue-500 font-bold text-[14px] hover:text-blue-600">
                        {user ? <LogoutBtn logoutHandler={logoutHandler} /> : <NavLink to={"login"}>Login / Register</NavLink>}
                    </li>

                    <li className="text-gray-500 hover:text-blue-600">
                        <Tooltip placement="bottom" title="Github Profile">
                            <a href="https://github.com/AbdulMoiz34" target="_blank"><FaGithub size={25} /></a>
                        </Tooltip>
                    </li>
                </ul>
            </div>
        </div >
    );
}

export default Header;