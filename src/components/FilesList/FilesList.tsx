import { DropZone, FileCard } from "../../components";
import { AiOutlinePlus } from "react-icons/ai";

interface FilesListProps {
    onDrop: (acceptedFiles: File[]) => void;
    files?: File[];
}

const FilesList = ({ onDrop, files }: FilesListProps) => {
    return (
        <div className="flex flex-wrap">
            {files?.map((file, idx) => <FileCard key={idx} file={file} />)}

            <DropZone
                onDrop={onDrop}
                element={
                    <div className="cursor-pointer w-32 h-32 flex flex-col justify-center items-center text-gray-400">
                        <AiOutlinePlus className="text-[#6968FF] text-3xl" />
                        <b></b>
                        <p className="font-bold text-[#6968FF] p-0 leading-tight mt-2">Add File</p>
                        <p className="m-0 p-0 text-xs leading-none">(upto 5Mb)</p>
                    </div>
                }
            />
        </div>
    )
}

export default FilesList;