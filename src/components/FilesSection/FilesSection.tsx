import { useState } from "react";
import { DropZone, FilesList, Heading } from "../../components";
import { MdDelete } from "react-icons/md";
import { FaDownload } from "react-icons/fa";


const FilesSection = () => {
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = (acceptedFiles: File[]) => {
        setFiles([...files, ...acceptedFiles]);
        console.log(files);
    }

    return (
        <div className="w-full h-full py-6 px-10 flex flex-col">
            <div className="flex justify-between items-center">
                <Heading text="Files" />
                {files.length > 0 && (
                    <div className="flex gap-8 text-sm  items-center justify-center">
                        <div className="cursor-pointer text-blue-500 flex gap-2 items-center hover:underline active:opacity-60">
                            <FaDownload size={18} />
                            <span>Download All</span>
                        </div>
                        <div className="cursor-pointer text-red-800 flex gap-2 items-center hover:underline active:opacity-60">
                            <MdDelete size={18} />
                            <span>Delete All</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-6 h-9/12">
                {files.length > 0 ?
                    <FilesList onDrop={onDrop} files={files} /> :
                    <DropZone onDrop={onDrop} element={
                        <div className="cursor-pointer hover:bg-gray-50 flex justify-center items-center h-full text-gray-400">
                            <div className="w-3/6 text-center">
                                Drag and drop any files up to 2 files, 5Mbs each or <span className="text-[#6868ffb5]">Browse
                                    Upgrade</span> to get more space
                            </div>
                        </div>
                    } />
                }
            </div>
        </div >
    )
}

export default FilesSection;