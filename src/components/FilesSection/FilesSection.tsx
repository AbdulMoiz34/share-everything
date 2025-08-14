import { useContext, useEffect, useState } from "react";
import { DropZone, FilesList, Heading } from "../../components";
import { deleteFileFromCloudinary, downloadFiles, uploadToCloudinary } from "../../helpers";
import { onValue, ref, db, update } from "../../firebase";
import FilesBtns from "../FilesBtns";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context";
import { LuFileStack } from "react-icons/lu";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { usePreventUnload } from "../../hooks";
import { CiCircleInfo } from "react-icons/ci";

export interface FileType {
    url: string;
    type: string;
    name: string;
    public_id: string;
    createdAt: number;
    fileSize: number;
}

const FilesSection = () => {
    const [tempFiles, setTempFiles] = useState<File[]>([]);
    const [files, setFiles] = useState<FileType[]>([]);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [btnsLoading, setBtnsLoading] = useState<boolean>(false);
    const { id } = useParams();
    const [isUploading, setIsUploading] = useState<boolean>(false);

    useEffect(() => {
        onValue(ref(db, `shares/${id}`), (snapshot) => {
            if (snapshot.val()) {
                setFiles(snapshot.val().files || []);
            }
            setLoading(false);
        });
    }, []);


    usePreventUnload(isUploading);
    const onDrop = async (acceptedFiles: File[]) => {
        if (!id) {
            toast.error("Generate URL Please.");
            return;
        }
        if (!user && (files.length > 10 || (files.length + acceptedFiles.length > 10))) {
            toast.error("Login required.");
            return;
        }

        if (acceptedFiles.length > 10) {
            toast.error("you can select 10 files at once.");
            return;
        }
        setTempFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

        try {
            setIsUploading(true);
            const promises = acceptedFiles.map((file) => uploadToCloudinary(file));
            const newFiles = await Promise.all(promises);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
            await update(ref(db, `shares/${id}`), {
                files: [...files, ...newFiles]
            });
            toast.success("Saved.");
        } catch (err: unknown) {
            toast.error("something went wrong.");
        } finally {
            setTempFiles([]);
            setIsUploading(false);
        }
    }

    const deleteAllFiles = async () => {
        try {
            toast.loading("Loading...");
            setBtnsLoading(true);
            const promises = files.map(file => deleteFileFromCloudinary(file.public_id));
            await Promise.all(promises);
            await update(ref(db, `shares/${id}`), { files: [] });
            toast.dismiss();
            toast.success(`${files.length > 1 ? "Files" : "File"} deleted.`);
            setFiles([]);
        } catch (err) {
            toast.dismiss();
            toast.error("Try again.");
        } finally {
            setBtnsLoading(false);
        }
    }

    const downloadAllFiles = async () => {
        if (!user) {
            toast.error("Login is required.");
            return;
        }
        try {
            setIsUploading(true);
            setBtnsLoading(true);
            const load = toast.loading("Loading...");
            await downloadFiles(files);
            toast.dismiss(load);
            toast.success("Files downloaded successfully.");
        } catch (_err) {
            toast.dismiss();
            toast.error("Something went wrong. Try");
        } finally {
            setBtnsLoading(false);
            setIsUploading(false);
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
        <div className="w-full h-full py-6 px-4 sm:px-10 flex flex-col">
            <div className="flex justify-between items-center flex-col sm:flex-row gap-y-2">
                <Heading text="Files" />
                {files.length > 0 && <FilesBtns loading={btnsLoading} downloadAllFiles={downloadAllFiles} deleteFiles={deleteAllFiles} />}
            </div>
            <div className="flex gap-1 mt-2 justify-center sm:items-center">
                <CiCircleInfo className="text-red-600 sm:text-lg"/>
                <p className="text-red-500 text-xs sm:text-sm text-center">Files will automatically be deleted after <span className="font-bold">2 days</span>.</p>
            </div>
            <div className="mt-3 sm:mt-6 h-9/12">
                {tempFiles.length || files.length ?
                    <FilesList onDrop={onDrop} tempFiles={tempFiles} files={files} /> :
                    <DropZone onDrop={onDrop} element={
                        <div className="cursor-pointer hover:border-blue-400 hover:border-1 flex justify-center items-center h-full text-blue-800">
                            {user ? <div className="text-xs flex flex-col justify-center items-center gap-2"><LuFileStack className="text-4xl" /> Drag and drop any files.</div> : <div className="w-full text-center text-xs sm:text-sm">
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