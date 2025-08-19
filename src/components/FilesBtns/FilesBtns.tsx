import { MdDelete } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import ConfirmModal from "../ConfirmModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearSelection, selectAll } from "../../store/reducers/fileReducer";

interface FilesBtnsProps {
    deleteFiles: () => Promise<void>;
    downloadAllFiles: () => Promise<void>;
    loading: boolean;
}

const FilesBtns = ({ deleteFiles, downloadAllFiles, loading }: FilesBtnsProps) => {
    const dispatch = useAppDispatch();
    const selectedCount = useAppSelector((s) => s.fileUpload.selectedIds.length);
    const allCount = useAppSelector((s) => s.fileUpload.files.length);
    const isAllSelected = allCount > 0 && selectedCount === allCount;
    const deleteFilesHandler = () => {
        ConfirmModal("Are you sure?", "Files will be removed permanently.", deleteFiles);
    }

    return (
        <div className="flex gap-8 text-xs sm:text-sm items-center justify-center">
            <button
                disabled={loading || allCount === 0}
                onClick={() => (isAllSelected ? dispatch(clearSelection()) : dispatch(selectAll()))}
                className="cursor-pointer text-gray-700 flex gap-2 items-center hover:underline active:opacity-60 disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
            >
                <span>{isAllSelected ? "Clear Selection" : "Select All"}</span>
            </button>
            <button disabled={loading} onClick={downloadAllFiles} className="cursor-pointer text-blue-600 flex gap-2 items-center hover:underline active:opacity-60 disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline">
                <FaDownload size={18} />
                <span>{selectedCount > 0 ? `Download Selected (${selectedCount})` : "Download All"}</span>
            </button>
            <button disabled={loading} onClick={deleteFilesHandler} className="disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline cursor-pointer text-red-800 flex gap-2 items-center hover:underline active:opacity-60">
                <MdDelete size={18} />
                <span>{selectedCount > 0 ? `Delete Selected (${selectedCount})` : "Delete All"}</span>
            </button>
        </div>
    )
}

export default FilesBtns;