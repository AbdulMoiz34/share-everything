import { CiFileOn } from "react-icons/ci";
import { FaHtml5, FaRegCheckCircle } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io5";
import { IoLogoJavascript } from "react-icons/io";
import { MdOutlinePreview } from "react-icons/md";
import type { FileType } from "../../types/file";
import { formatedDate, formatFileSize } from "../../helpers";
import { useState } from "react";

interface FileCardProps {
    file: FileType | File;
    selected?: boolean;
    onToggleSelect?: () => void;
}

const FileCard = ({ file, selected = false, onToggleSelect }: FileCardProps) => {
    const [showOverlay, setShowOverlay] = useState<boolean>(false);

    let icon;
    const fileName: string = file.name;

    switch (file.type) {
        case "text/html":
            icon = <FaHtml5 size={40} />
            break;
        case "text/css":
            icon = <IoLogoCss3 size={40} />
            break;
        case "text/javascript":
            icon = <IoLogoJavascript size={40} />
            break;
        default:
            icon = <CiFileOn size={40} />
    }

    return (
        <div
            onClick={() => setShowOverlay((prev) => !prev)}
            className={`relative bg-red-500 group w-32 h-32 shadow overflow-hidden rounded-md ${selected ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}>
            {selected && (
                <div className="absolute top-1 right-1 z-20 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    <FaRegCheckCircle size={12} />
                </div>
            )}

            {file?.type?.startsWith("image") ? (
                <img
                    loading="lazy"
                    className="object-cover w-full h-full"
                    src={"url" in file ? file.url : URL.createObjectURL(file as File)}
                    alt={fileName}
                />
            ) : (
                <div className="flex flex-col justify-center items-center w-full h-full p-2">
                    {icon}
                    <p className="text-center text-gray-600 opacity-70 text-sm">
                        {fileName.length > 10
                            ? fileName.slice(0, 10) + "..."
                            : fileName}
                        <b>{fileName.slice(fileName.lastIndexOf("."))}</b>
                    </p>
                </div>
            )}

            <div className={`${selected ? "" : showOverlay ? "opacity-100" : "opacity-0 group-hover:opacity-100"} absolute inset-0 bg-black/40 transition-opacity`}>
                <div className={`${selected && "hidden"} flex items-center justify-center gap-3 w-full h-full`}>
                    <p className="absolute top-2 text-white text-xs">{"createdAt" in file ? formatedDate(file.createdAt) : ""}</p>
                    <p className="absolute bottom-2 text-white text-xs">{"fileSize" in file ? formatFileSize(file.fileSize) : ""}</p>
                    <a
                        href={"url" in file ? file.url : ""}
                        target="_blank"
                        className="p-2 bg-white rounded-full shadow hover:scale-110 transition hover:bg-blue-100"
                    >
                        <MdOutlinePreview size={17} className="text-gray-800" />
                    </a>
                    <button
                        onClick={onToggleSelect}
                        className="p-2 bg-white rounded-full shadow hover:scale-110 transition cursor-pointer hover:bg-blue-100">
                        <FaRegCheckCircle size={15} className="text-gray-800" />
                    </button>
                </div>
                <div className={`${selected ? "block" : "hidden"} w-full h-full flex justify-center items-center`}>
                    <button
                        onClick={onToggleSelect}
                        className="p-3 bg-blue-500 rounded-full shadow hover:scale-110 transition cursor-pointer hover:bg-blue-700">
                        <FaRegCheckCircle size={25} className="text-white" />
                    </button>
                </div>
            </div>
        </div>

    );
}

export default FileCard;