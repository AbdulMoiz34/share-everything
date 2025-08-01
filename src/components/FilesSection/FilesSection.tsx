import { useEffect, useState } from "react";
import { DropZone, FilesList, Heading } from "../../components";
import { downloadFiles, uploadToCloudinary } from "../../helpers";
import { onValue, ref, db, set, remove, } from "../../db";
import FilesBtns from "../FilesBtns";

interface FileType {
    url: string;
    type: string;
    name: string;
}

const FilesSection = () => {
    const [tempFiles, setTempFiles] = useState<File[]>([]);
    const [files, setFiles] = useState<FileType[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        console.log("called");
        onValue(ref(db, 'file-sharing'), (snapshot) => {
            if (snapshot.val()) {
                setFiles(snapshot.val().files || []);
            }
        });
    }, []);

    const onDrop = async (acceptedFiles: File[]) => {
        console.log(acceptedFiles.length)
        if (files.length > 10 || (files.length + acceptedFiles.length > 10)) {
            alert("10 files are allowed.");
            return;
        }
        setTempFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

        try {
            const promises = acceptedFiles.map((file) => uploadToCloudinary(file));
            const newFiles = await Promise.all(promises);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
            setTempFiles([]);
            await set(ref(db, 'file-sharing'), {
                files: [...files, ...newFiles]
            });
        } catch (err) {
            console.log("Error uploading files:", err);
        }
    }

    const deleteAllFiles = async () => {
        try {
            await remove(ref(db, 'file-sharing'));
            setFiles([]);
        } catch (err) {
            console.log("error", err);
        }
    }

    const downloadAllFiles = () => {
        const res = downloadFiles(files);
        console.log(res);
    }
    
    return (
        <div className="w-full h-full py-6 px-10 flex flex-col">
            <div className="flex justify-between items-center">
                <Heading text="Files" />
                {files.length > 0 && <FilesBtns downloadAllFiles={downloadAllFiles} deleteFiles={deleteAllFiles} />}
            </div>
            <div className="mt-6 h-9/12">
                {tempFiles.length || files.length ?
                    <FilesList onDrop={onDrop} tempFiles={tempFiles} files={files} /> :
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