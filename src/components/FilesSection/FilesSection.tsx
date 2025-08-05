import { useContext, useEffect, useState } from "react";
import { DropZone, FilesList, Heading } from "../../components";
import { downloadFiles, uploadToCloudinary } from "../../helpers";
import { onValue, ref, db, set, remove, } from "../../firebase";
import FilesBtns from "../FilesBtns";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthContext from "../../context";
import { LuFileStack } from "react-icons/lu";

interface FileType {
    url: string;
    type: string;
    name: string;
}

const FilesSection = () => {
    const [tempFiles, setTempFiles] = useState<File[]>([]);
    const [files, setFiles] = useState<FileType[]>([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        onValue(ref(db, 'file-sharing'), (snapshot) => {
            if (snapshot.val()) {
                setFiles(snapshot.val().files || []);
            }
        });
    }, []);

    let id: any;
    const onDrop = async (acceptedFiles: File[]) => {
        if (!user && (files.length > 10 || (files.length + acceptedFiles.length > 10))) {
            toast.error("Login required.");
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
            toast.success("Saved.");
            clearTimeout(id);
            id = setTimeout(deleteAllFiles, 1_8_00_000); // file will be removed after 30mins
        } catch (err) {
            toast.error("something went wrong.");
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
        if (!user) {
            toast.error("Login is required.");
            return;
        }
        try {
            const load = toast.loading("Loading...");
            await downloadFiles(files);
            toast.dismiss(load);
            toast.success("Files downloaded successfully.");
        } catch (_err) {
            console.log(_err);
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
                        <div className="cursor-pointer hover:border-blue-400 hover:border-1 flex justify-center items-center h-full text-blue-800">
                            {user ? <div className="text-xs flex flex-col justify-center items-center gap-2"><LuFileStack className="text-4xl" /> Drag and drop any files.</div> : <div className="w-3/6 text-center text-sm">
                                Drag and drop any files up to <b className="text-blue-800">10</b>. <br />If you want to add more, <Link to={"/login"} className="text-blue-500 font-bold">Login</Link> Please
                            </div>}
                        </div>
                    } />
                }
            </div>
        </div >
    )
}

export default FilesSection;