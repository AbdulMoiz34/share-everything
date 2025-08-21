import { FaBarsStaggered } from "react-icons/fa6";
import { FaFileAlt, FaRegFileAlt } from "react-icons/fa";

type SideBarProps = {
    type: string;
    setType: (type: "text" | "files") => void;
}
const SideBar = ({ type, setType }: SideBarProps) => {

    const isText = type === "text";

    return (
        <div className="bg-blue-100 flex justify-center sm:justify-start flex-row sm:flex-col h-full">
            <button
                onClick={() => setType("text")}
                className={`${isText && "!text-blue-500 bg-white"} text-gray-600 flex-1 sm:flex-none bg-transparent p-4 sm:p-6 text-lg sm:text-2xl hover:bg-white cursor-pointer`}>
                <FaBarsStaggered />
            </button>
            
            <button
                onClick={() => setType("files")}
                className={`${!isText && "bg-white"} bg-transparent flex-1 sm:flex-none p-4 sm:p-6 text-lg sm:text-2xl hover:bg-white cursor-pointer text-gray-600`}>
                {isText ? <FaRegFileAlt /> : <FaFileAlt className="text-blue-500" />}
            </button>
        </div >
    )
}

export default SideBar;