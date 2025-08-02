import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Switch } from "antd";

const Header = () => {
    return (
        <div className="header-bar flex justify-between items-center">
            <div>
                <img src={Logo} alt="Fast Share Logo." className="w-36 h-36" />
            </div>
            <div>
                <ul className="flex gap-16 items-center justify-center">
                    <li className="text-gray-500 text-[14px] hover:text-blue-500"><NavLink to={""}>How it works</NavLink></li>
                    <li className="text-gray-500 text-[14px] hover:text-blue-500"><NavLink to={""}>Download</NavLink></li>
                    <li className="text-gray-500 text-[14px] hover:text-blue-500"><NavLink to={""}>Upgrade</NavLink></li>
                    <li className="text-blue-500 font-bold text-[14px] hover:text-blue-600"><NavLink to={"login"}>Login / Register</NavLink></li>
                    <li>
                        <Switch defaultChecked={false} onChange={(checked) => console.log("checked", checked)} />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;