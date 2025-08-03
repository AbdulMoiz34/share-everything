import { NavLink } from "react-router-dom";
import { Switch } from "antd";
import Logo from "../Logo";
import { FaGithub } from "react-icons/fa";


const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-blue-500';
};

const Header = () => {
    return (
        <div className="header-bar flex justify-between items-center">
            <div>
                <Logo />
            </div>
            <div>
                <ul className="flex gap-12 items-center justify-center text-sm">
                    <li>
                        <NavLink to="/" className={getNavLinkClass}>Home </NavLink>
                    </li>
                    <li>
                        <NavLink to="/howToUse" className={getNavLinkClass}>How to use it </NavLink>
                    </li>

                    <li className="text-blue-500 font-bold text-[14px] hover:text-blue-600"><NavLink to={"login"}>Login / Register</NavLink></li>
                    <li className="text-gray-500 hover:text-blue-600">
                        <a href="https://github.com/AbdulMoiz34" target="_blank"><FaGithub size={25} /></a>
                    </li>
                    <li>
                        <Switch defaultChecked={false} onChange={(checked) => console.log("checked", checked)} />
                    </li>
                </ul>
            </div>
        </div >
    );
}

export default Header;