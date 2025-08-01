import { CiFileOn } from "react-icons/ci";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io5";
import { IoLogoJavascript } from "react-icons/io";


interface FileCardProps {
    file: {
        url: string;
        type: string;
        name: string;
    } | File;
}

const FileCard = ({ file }: FileCardProps) => {
    let icon;
    let fileName: string = file.name;
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
        <div className="hover:bg-gray-100 w-32 h-32 flex flex-col justify-center items-center gap-2 shadow">
            {file?.type?.startsWith("image") ?
                <img className="object-cover w-full h-full" src={"url" in file ? file.url : URL.createObjectURL(file as File)} /> :
                <>
                    {icon}
                    <p className="text-center text-gray-600 opacity-70 text-sm">{fileName.length > 10 ? fileName.slice(0, 10) + "..." : fileName}<b>{fileName.slice(fileName.lastIndexOf("."))}</b></p>
                </>
            }
        </div >
    );
}

export default FileCard;