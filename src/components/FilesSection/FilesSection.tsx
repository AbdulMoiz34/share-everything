import { useEffect, useState } from "react";
import { DropZone, FilesList, Heading } from "../../components";
import { downloadFiles, uploadToCloudinary } from "../../helpers";
import { onValue, ref, db, set, remove, } from "../../db";
import FilesBtns from "../FilesBtns";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface FileType {
    url: string;
    type: string;
    name: string;
}

const FilesSection = () => {
    const [tempFiles, setTempFiles] = useState<File[]>([]);
    const [files, setFiles] = useState<FileType[]>([]);

    useEffect(() => {
        onValue(ref(db, 'file-sharing'), (snapshot) => {
            if (snapshot.val()) {
                setFiles(snapshot.val().files || []);
            }
        });
    }, []);

    const onDrop = async (acceptedFiles: File[]) => {
        if (files.length > 10 || (files.length + acceptedFiles.length > 10)) {
            toast.error("10 Files are allowed.");
            return;
        }

        setTempFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

        try {
            const promises = acceptedFiles.map((file) => uploadToCloudinary(file));
            const newFiles = await Promise.all(promises);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
            setTempFiles([]);
            toast.success("Saved.");
            await set(ref(db, 'file-sharing'), {
                files: [...files, ...newFiles]
            });

        } catch (err) {
            toast.error((err as Error).message);
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

    const downloadAllFiles = async () => {
        try {
            let load = toast.loading("Loading...");
            await downloadFiles(files);
            toast.dismiss(load);
            toast.success("Files downloaded successfully.");
        } catch (err) {
            toast.error("Something went wrong. Try");
        }
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
                            <div className="w-3/6 text-center text-sm">
                                Drag and drop any files up to <b className="text-blue-800">10</b>. <br />If you want to add more, <Link to={"/login"} className="text-blue-500 font-bold">Login</Link> Please
                            </div>
                        </div>
                    } />
                }
            </div>
        </div >
    )
}

export default FilesSection;