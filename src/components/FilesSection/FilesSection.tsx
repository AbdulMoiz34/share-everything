import { useCallback, useState } from "react";
import { Heading } from "../../components";
import { useDropzone } from "react-dropzone";

const FilesSection = () => {
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        
        console.log(acceptedFiles);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div className="w-full h-full py-6 px-10 flex flex-col">
            <Heading text="Files" />
            <div {...getRootProps()} className={`mt-6 border-dashed border-1 h-full mb-4 ${isDragActive ? "border-[#646EFF] border-solid" : "border-gray-400"}`}>
                <input {...getInputProps()} className="hidden" />
                <div className="flex justify-center items-center h-full text-gray-400">
                    <div className="w-3/6 text-center">
                        Drag and drop any files up to 2 files, 5Mbs each or <span>Browse </span>
                        <span>Upgrade</span> to get more space
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilesSection;