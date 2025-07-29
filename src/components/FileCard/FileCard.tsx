import { CiFileOn } from "react-icons/ci";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io5";
import { IoLogoJavascript } from "react-icons/io";


interface FileCardProps {
    file: File
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

        // if (file.type.startsWith("image/")) {
        //     const url = URL.createObjectURL(file);
        //     icon = <img src={url} alt={file.name} className="w-32 h-32 object-cover" />
        // } else {
        //     icon = <CiFileOn size={40} />
        // }

    }

    return (
        <div className="hover:bg-gray-100 px-2 w-32 h-32 flex flex-col justify-center items-center gap-2">
            {file.type.startsWith("image") ?
                <img className="object-cover w-full h-full" src={URL.createObjectURL(file)} /> :
                <>
                    {icon}
                    < p className="text-center text-gray-600 opacity-70 text-sm">{fileName.slice(0, 10)}<b>{fileName.slice(fileName.lastIndexOf("."))}</b></p>
                </>
            }
        </div >
    );
}

export default FileCard;