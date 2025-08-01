import { MdDelete } from "react-icons/md";
import { FaDownload } from "react-icons/fa";

interface FilesBtnsProps {
    deleteFiles: () => Promise<void>;
}

const FilesBtns = ({ deleteFiles }: FilesBtnsProps) => {
    return (
        <div className="flex gap-8 text-sm  items-center justify-center">
            <div className="cursor-pointer text-blue-500 flex gap-2 items-center hover:underline active:opacity-60">
                <FaDownload size={18} />
                <span>Download All</span>
            </div>
            <div onClick={deleteFiles} className="cursor-pointer text-red-800 flex gap-2 items-center hover:underline active:opacity-60">
                <MdDelete size={18} />
                <span>Delete All</span>
            </div>
        </div>
    )
}

export default FilesBtns