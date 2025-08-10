import { useContext, useEffect, useState } from "react";
import { DropZone, FilesList, Heading } from "../../components";
import { downloadFiles, uploadToCloudinary } from "../../helpers";
import { onValue, ref, db, update } from "../../firebase";
import FilesBtns from "../FilesBtns";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context";
import { LuFileStack } from "react-icons/lu";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

interface FileType {
    url: string;
    type: string;
    name: string;
}

const FilesSection = () => {
    const [tempFiles, setTempFiles] = useState<File[]>([]);
    const [files, setFiles] = useState<FileType[]>([]);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        onValue(ref(db, `shares/${id}`), (snapshot) => {
            if (snapshot.val()) {
                setFiles(snapshot.val().files || []);
            }
            setLoading(false);
        });
    }, []);

    let timeoutId: ReturnType<typeof setTimeout>;
    const onDrop = async (acceptedFiles: File[]) => {
        if (!id) {
            toast.error("Generate URL Please.");
            return;
        }
        if (!user && (files.length > 10 || (files.length + acceptedFiles.length > 10))) {
            toast.error("Login required.");
            return;
        }
        setTempFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

        try {
            const promises = acceptedFiles.map((file) => uploadToCloudinary(file));
            const newFiles = await Promise.all(promises);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
            await update(ref(db, `shares/${id}`), {
                files: [...files, ...newFiles]
            });
            toast.success("Saved.");
            clearTimeout(timeoutId);
            timeoutId = setTimeout(deleteAllFiles, 1_8_00_000); // file will be removed after 30mins
        } catch (err: unknown) {
            toast.error("something went wrong.");
        } finally {
            setTempFiles([]);
        }
    }

    const deleteAllFiles = async () => {
        try {
            await update(ref(db, `shares/${id}`), { files: [] });
            setFiles([]);
        } catch (err) {
            toast.error("Try again.");
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
            toast.dismiss();
            toast.error("Something went wrong. Try");
        }
    }
    if (loading) {
        return <div className="relative w-full h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
        </div>
    }

    return (
        <div className="w-full h-full py-6 px-10 flex flex-col">
            <div className="flex justify-between items-center flex-col sm:flex-row gap-y-2">
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