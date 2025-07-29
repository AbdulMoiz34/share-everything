import { useDropzone } from "react-dropzone";

interface DropZoneProps {
    element: React.ReactNode;
    onDrop?: (acceptedFiles: File[]) => void;
}

const DropZone = ({ element, onDrop }: DropZoneProps) => {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className={`border-dashed border-1 h-full ${isDragActive ? "border-[#646EFF] border-solid" : "border-gray-400"}`}>
            <input {...getInputProps()} />
            {element}
        </div>
    )
}

export default DropZone;