import { useContext, useMemo, useState } from "react";
import { DropZone, FileCard, Pagination } from "../../components";
import { AiOutlinePlus } from "react-icons/ai";
import { AuthContext } from "../../context";
import type { FileType } from "../../types/file";
import { useAppSelector } from "../../store/hooks";
import { useAppDispatch } from "../../store/hooks";
import { toggleSelect } from "../../store/reducers/fileReducer";


interface FilesListProps {
    onDrop: (acceptedFiles: File[]) => void;
    files: FileType[];
}

const FilesList = ({ onDrop, files }: FilesListProps) => {
    const { user } = useContext(AuthContext);
    const queueItems = useAppSelector((s) => s.uploadQueue.items);
    const activeQueue = useMemo(() => queueItems.filter(q => q.status === "queued" || q.status === "uploading"), [queueItems]);
    const selectedIds = useAppSelector((s) => s.fileUpload.selectedIds);
    const dispatch = useAppDispatch();
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
                {(files.length > 0 && currentPage < newArr.length) && newArr[currentPage].map((file) => (
                    <div key={file.public_id} className="relative">
                        <FileCard
                            file={file}
                            selected={selectedIds.includes(file.public_id)}
                            onToggleSelect={() => dispatch(toggleSelect(file.public_id))}
                        />
                    </div>
                ))}
                {activeQueue.map((q) => {
                    return <div className="rounded-md relative" key={q.id}>
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="flex flex-row gap-2">
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                            </div>
                        </div>
                        <div className="brightness-50 bg-black w-32 h-32 overflow-hidden rounded-md flex items-center justify-center">
                            {q.previewUrl ? (
                                <img src={q.previewUrl} loading="lazy" alt={q.name} className="object-cover w-full h-full"  />
                            ) : (
                                <div className="text-white text-[10px] p-2 text-center break-words">{q.name}</div>
                            )}
                        </div>
                    </div>
                })}

                <DropZone
                    onDrop={onDrop}
                    element={
                        <div className={`rounded-md cursor-pointer w-32 h-32 flex flex-col justify-center items-center text-gray-400 hover:border-1 hover:border-blue-500`}>
                            <AiOutlinePlus className="text-[#6968FF] text-3xl" />
                            <b></b>
                            <p className="font-bold text-[#6968FF] p-0 leading-tight mt-2">Add Files</p>
                            <p className="m-0 p-0 text-xs leading-none text-blue-600">{user ? "No Limit" : "(10) Files"}</p>
                        </div>
                    }
                />
            </div>
            <div className="mt-8 flex justify-center sm:justify-self-end">
                <Pagination pageChangeHandler={pageChangeHandler} pageSize={pageSize} total={files.length} />
            </div>
        </div>
    )
}

export default FilesList;