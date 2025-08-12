import { CiFileOn } from "react-icons/ci";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io5";
import { IoLogoJavascript } from "react-icons/io";
import { MdOutlinePreview } from "react-icons/md";


interface FileCardProps {
    file: {
        url: string;
        type: string;
        name: string;
    } | File;
}

const FileCard = ({ file }: FileCardProps) => {
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
        <div className="relative group w-32 h-32 shadow overflow-hidden rounded-md">
            {file?.type?.startsWith("image") ? (
                <img
                    loading="lazy"
                    className="object-cover w-full h-full"
                    src={"url" in file ? file.url : URL.createObjectURL(file as File)}
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

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <a
                    href={"url" in file ? file.url : ""}
                    target="_blank"
                    className="p-2 bg-white rounded-full shadow hover:scale-110 transition hover:bg-blue-100"
                >
                    <MdOutlinePreview size={17} className="text-gray-800" />
                </a>
            </div>
        </div>

    );
}

export default FileCard;