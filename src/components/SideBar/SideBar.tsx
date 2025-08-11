import { FaBarsStaggered } from "react-icons/fa6";
import { FaFileAlt, FaRegFileAlt } from "react-icons/fa";

type SideBarProps = {
    type: string;
    setType: (type: "text" | "files") => void;
}
const SideBar = ({ type, setType }: SideBarProps) => {
    const isActiveClass = type === "text";
    return (
        <div className="bg-blue-100 flex justify-center sm:justify-start flex-row sm:flex-col h-full">
            <button className={`flex-1 sm:flex-none  p-4 sm:p-6 text-lg sm:text-2xl hover:bg-white cursor-pointer ${isActiveClass ? "text-blue-500 font-semibold bg-white" : "text-gray-500"}`} onClick={() => setType("text")}>
                <FaBarsStaggered />
            </button>
            <button className={`flex-1 sm:flex-none p-4 sm:p-6 text-lg sm:text-2xl hover:bg-white cursor-pointer ${!isActiveClass ? "text-blue-500 font-semibold bg-white" : "text-gray-500"}`} onClick={() => setType("files")}>
                {!isActiveClass ?
                    <FaFileAlt className="text-blue-500" /> :
                    <FaRegFileAlt />}
            </button>
        </div>
    )
}

export default SideBar;