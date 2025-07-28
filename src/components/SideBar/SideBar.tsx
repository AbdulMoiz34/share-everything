import { FaBarsStaggered } from "react-icons/fa6";
import { FaFileAlt, FaRegFileAlt } from "react-icons/fa";

type SideBarProps = {
    type: string;
    setType: (type: string) => void;
}
const SideBar = ({ type, setType }: SideBarProps) => {
    const isActiveClass = type === "text";
    return (
        <div className="bg-[#F4F4F4] flex flex-col">
            <button className={`p-6 text-2xl hover:bg-white cursor-pointer ${isActiveClass ? "text-[#646EFF] font-semibold bg-white" : "text-gray-500"}`} onClick={() => setType("text")}>
                <FaBarsStaggered />
            </button>
            <button className={`p-6 text-2xl hover:bg-white cursor-pointer ${!isActiveClass ? "text-[#646EFF] font-semibold bg-white" : "text-gray-500"}`} onClick={() => setType("files")}>
                {!isActiveClass ?
                    <FaFileAlt className="text-[#646EFF]" /> :
                    <FaRegFileAlt />}
            </button>
        </div>
    )
}

export default SideBar;