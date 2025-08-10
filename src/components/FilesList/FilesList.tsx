import { useContext, useState } from "react";
import { DropZone, FileCard, Pagination } from "../../components";
import { AiOutlinePlus } from "react-icons/ai";
import { AuthContext } from "../../context";

interface FileType {
    url: string;
    type: string;
    name: string;
}

interface FilesListProps {
    onDrop: (acceptedFiles: File[]) => void;
    files: FileType[];
    tempFiles: File[];
}

const FilesList = ({ onDrop, files, tempFiles }: FilesListProps) => {
    const { user } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const chunks = (arr: FileType[], size: number) => {
        const newArr: FileType[][] = [];

        for (let i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    }

    const pageSize = 6;
    const newArr = chunks(files, pageSize);

    const pageChangeHandler = (page: number) => {
        setCurrentPage(page - 1);
    }

    return (
        <div className="relative h-full">
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {newArr[currentPage].map((file, idx) => (
                    <FileCard key={idx} file={file} />
                ))}
                {tempFiles.map((tempFile, idx) => {
                    return <div className="rounded-md relative" key={idx}>
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="flex flex-row gap-2">
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                            </div>
                        </div>
                        <div className="brightness-50 bg-black">
                            <FileCard key={idx} file={tempFile} />
                        </div>
                    </div>
                })}

                <DropZone
                    onDrop={onDrop}
                    element={
                        <div className={`${tempFiles.length && "hidden"} cursor-pointer w-32 h-32 flex flex-col justify-center items-center text-gray-400 hover:border-1 hover:border-blue-500`}>
                            <AiOutlinePlus className="text-[#6968FF] text-3xl" />
                            <b></b>
                            <p className="font-bold text-[#6968FF] p-0 leading-tight mt-2">Add Files</p>
                            <p className="m-0 p-0 text-xs leading-none text-blue-600">{user ? "No Limit" : "(10) Files"}</p>
                        </div>
                    }
                />
            </div>
            <div className="mt-8 flex justify-self-end">
                <Pagination pageChangeHandler={pageChangeHandler} pageSize={pageSize} total={files.length} />
            </div>
        </div>
    )
}

export default FilesList;