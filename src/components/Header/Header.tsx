import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.svg";

const Header = () => {
    return (
        <div className="header-bar flex justify-between items-center">
            <div>
                <img src={Logo} alt="Fast Share Logo." />
            </div>
            <div>
                <ul className="flex gap-16 items-center justify-center">
                    <li className="text-gray-500 text-[14px] hover:text-blue-500 md:text-black font-bold"><NavLink to={""}>How it works</NavLink></li>
                    <li className="text-gray-500 text-[14px] hover:text-blue-500"><NavLink to={""}>Download</NavLink></li>
                    <li className="text-gray-500 text-[14px] hover:text-blue-500"><NavLink to={""}>Upgrade</NavLink></li>
                    <li className="text-blue-500 font-bold text-[14px] hover:text-blue-600"><NavLink to={""}>Login / Register</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default Header;