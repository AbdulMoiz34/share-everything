import { NavLink } from "react-router-dom";
import { Tooltip } from "antd";
import Logo from "../Logo";
import { FaBars, FaGithub } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";


const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-blue-500';
};

const Header = () => {
    const { user, setUser } = useContext(AuthContext);

    const signoutHandler = async () => {
        try {
            await signOut(auth);
            setUser(null);
            toast.success("User signed out.");
        } catch (err) {
            toast.error("Error in signing out.");
        }
    }

    return (
        <div className="header-bar flex justify-between items-center">
            <div>
                <Logo />
            </div>
            <div>
                <button className="sm:hidden cursor-pointer hover:shadow hover:bg-blue-100 hover:text-blue-900 p-2 rounded-md">
                    <FaBars />
                </button>
            </div>
            <div className="hidden sm:block">
                <ul className="items-center justify-center text-sm flex gap-8 md:gap-12">
                    <li>
                        <NavLink to="/" className={getNavLinkClass}>Home </NavLink>
                    </li>
                    <li>
                        <NavLink to="/howToUse" className={getNavLinkClass}>How to use it </NavLink>
                    </li>

                    <li className="text-blue-500 font-bold text-[14px] hover:text-blue-600">
                        {user ?
                            <Tooltip placement="bottom" title="Are you sure?">
                                <button className="cursor-pointer" onClick={signoutHandler}>Log Out</button>
                            </Tooltip> :
                            <NavLink to={"login"}>Login / Register</NavLink>}
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