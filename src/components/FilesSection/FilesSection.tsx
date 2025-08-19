import { useContext, useEffect, useState } from "react";
import { DropZone, FilesList, Heading } from "../../components";
import { downloadFiles, validateFile } from "../../helpers";
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
import { push } from "firebase/database";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setFiles } from "../../store/reducers/fileReducer";
import { useDeleteResourceMutation, useUploadToCloudinaryMutation } from "../../store/services/filesApi";
import { enqueueUploads, setUploadStatus, removeFromQueue } from "../../store/reducers/uploadQueue";
import { UploadManager } from "../../store/services/UploadManager";
import { nanoid } from "nanoid";
import type { FileType } from "../../types/file";

 

const FilesSection = () => {
    const dispatch = useAppDispatch();
    const files = useAppSelector((s) => s.fileUpload.files);
    const queueItems = useAppSelector((s) => s.uploadQueue.items);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [btnsLoading, setBtnsLoading] = useState<boolean>(false);
    const { id } = useParams();
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadToCloudinaryMutation] = useUploadToCloudinaryMutation();
    const [deleteResource] = useDeleteResourceMutation();

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }
        const unsubscribe = onValue(ref(db, `shares/${id}`), (snapshot) => {
            if (snapshot.val()) {
                const filesArray: FileType[] = [];
                for (const [, file] of Object.entries(snapshot.val().files || {})) {
                    filesArray.push(file as FileType);
                }
                dispatch(setFiles(filesArray));
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [id, dispatch]);


    usePreventUnload(isUploading);
    const onDrop = async (acceptedFiles: File[]) => {
        if (!id) {
            toast.error("Generate the URL and Save it.");
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
        try {
            setIsUploading(true);
            for (const file of acceptedFiles) {
                const validate = validateFile(file);
                if (validate !== true) {
                    toast.error(`File type .${validate} is not allowed.`);
                    return;
                }
            }

            const queueItems = acceptedFiles.map((file) => {
                const id = nanoid();
                UploadManager.add(id, file);
                return {
                    id,
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    createdAt: Date.now(),
                    status: "queued" as const,
                    previewUrl: file.type.startsWith("image") ? URL.createObjectURL(file) : undefined
                };
            });
            dispatch(enqueueUploads(queueItems));

            const promises = queueItems.map(async (q) => {
                dispatch(setUploadStatus({ id: q.id, status: "uploading" }));
                const f = UploadManager.get(q.id)!;
                try {
                    const uploaded = await uploadToCloudinaryMutation(f).unwrap();
                    dispatch(setUploadStatus({ id: q.id, status: "success" }));
                    UploadManager.remove(q.id);
                    if (q.previewUrl) URL.revokeObjectURL(q.previewUrl);
                    dispatch(removeFromQueue([q.id]));
                    await push(ref(db, `shares/${id}/files`), uploaded);
                } catch (e) {
                    dispatch(setUploadStatus({ id: q.id, status: "error", errorMessage: "Upload failed" }));
                    throw e;
                }
            });
            await Promise.all(promises);
            toast.success("Saved.");
        } catch (_err: unknown) {
            toast.error("something went wrong.");
        } finally {
            setIsUploading(false);
        }
    }

    const deleteAllFiles = async () => {
        try {
            toast.loading("Loading...");
            setBtnsLoading(true);
            const promises = files.map(file => deleteResource({ public_id: file.public_id, resource_type: file.resource_type }).unwrap());
            await Promise.all(promises);
            await update(ref(db, `shares/${id}`), { files: [] });
            toast.dismiss();
            toast.success(`${files.length > 1 ? "Files" : "File"} deleted.`);
            dispatch(setFiles([]));
        } catch (_err) {
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
            {files.length > 0 && < div className="flex gap-1 mt-2 justify-center sm:items-center">
                <CiCircleInfo className="text-red-600 sm:text-lg" />
                <p className="text-red-500 text-xs sm:text-sm text-center">Files will automatically be deleted after <span className="font-bold">2 days</span>.</p>
            </div>}
            <div className="mt-3 mb-10 sm:mb-0 sm:mt-6 h-9/12">
                {queueItems.length || files.length ?
                    <FilesList onDrop={onDrop} files={files} /> :
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