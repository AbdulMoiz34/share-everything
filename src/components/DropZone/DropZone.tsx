import { useDropzone } from "react-dropzone";

interface DropZoneProps {
    element: React.ReactNode;
    onDrop?: (acceptedFiles: File[]) => void;
}

const DropZone = ({ element, onDrop }: DropZoneProps) => {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className={`rounded-md hover:border-transparent border-dashed border-1 h-full ${isDragActive ? "border-blue-500 border-solid" : "border-blue-400"}`}>
            <input {...getInputProps()} />
            {element}
        </div>
    )
}

export default DropZone;