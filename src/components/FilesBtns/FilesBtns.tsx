import { MdDelete } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import ConfirmModal from "../ConfirmModal";

interface FilesBtnsProps {
    deleteFiles: () => Promise<void>;
    downloadAllFiles: () => Promise<void>;
    loading: boolean
}

const FilesBtns = ({ deleteFiles, downloadAllFiles, loading }: FilesBtnsProps) => {
    const deleteFilesHandler = () => {
        ConfirmModal("Are you sure?", "Files will be removed permanently.", deleteFiles);
    }

    return (
        <div className="flex gap-8 text-xs sm:text-sm items-center justify-center">
            <button disabled={loading} onClick={downloadAllFiles} className="cursor-pointer text-blue-600 flex gap-2 items-center hover:underline active:opacity-60 disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline">
                <FaDownload size={18} />
                <span>Download All</span>
            </button>
            <button disabled={loading} onClick={deleteFilesHandler} className="disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline cursor-pointer text-red-800 flex gap-2 items-center hover:underline active:opacity-60">
                <MdDelete size={18} />
                <span>Delete All</span>
            </button>
        </div>
    )
}

export default FilesBtns