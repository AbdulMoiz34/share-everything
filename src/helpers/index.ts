import { find } from "linkifyjs";
import axios from "axios";
import JSZip from 'jszip';
import { saveAs } from "file-saver";
import { auth, googleProvider, signInWithPopup } from "../firebase/";
import type { FileType } from "../types/file";

const detetectURLS = (text: string): string[] => {
    const links = find(text);
    return links.map(link => link.href);
}


const formatFileSize = (bytes: number) => {

    if (bytes < 1024) {
        return bytes + ' Bytes';
    } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes < 1024 * 1024 * 1024) {
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
}

const formatedDate = (ms: number) => {
    const date = new Date(ms);
    return date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

const uploadToCloudinary = async (file: File): Promise<FileType> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'fastshare098121321421');
    formData.append('cloud_name', 'moiz34');

    try {
        const response = await axios.post(
            'https://api.cloudinary.com/v1_1/moiz34/auto/upload',
            formData
        );
        const url = response.data.secure_url;
        const public_id = response.data.public_id;
        const resource_type = response.data.resource_type;

        return { url, public_id, type: file.type, name: file.name, createdAt: Date.now(), fileSize: response.data.bytes, resource_type };
    } catch (error: unknown) {
        throw new Error("Upload Failed.");
    }
};


const downloadFiles = async (files: FileType[]) => {
    const zip = new JSZip();

    for (const file of files) {
        const url = file.url;
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = response.data;
        zip.file(file.name, blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "AllFiles");
};

const validateFiles = (files: File[]) => {
    const blockedFiles = new Set([
        "action", "apk", "app", "bat", "bin", "cmd", "com", "command",
        "cpl", "csh", "exe", "gadget", "inf1", "ins", "inx", "ipa", "isu",
        "job", "jse", "ksh", "lnk", "msc", "msi", "msp", "mst", "osx", "out",
        "paf", "pif", "prg", "ps1", "reg", "rgs", "run", "sct", "shb", "shs",
        "u3p", "vb", "vbe", "vbs", "vbscript", "workflow", "ws", "wsf"
    ]);

    for (let file of files) {
        const fileName: string | undefined = file.name.split(".").pop()?.toLocaleLowerCase();

        if (blockedFiles.has(fileName || "")) {
            console.log("true" , fileName);
            return fileName;
        }
        
        return true;
    }
}
const googleLogin = async () => {
    await signInWithPopup(auth, googleProvider);
};

const deleteFileFromCloudinary = async (public_id: string, resource_type: string) => {
    const response = await axios.delete("https://share-everthing-backend-production-d5e7.up.railway.app/api/delete-resource", {
        data: {
            public_id,
            resource_type
        },
        headers: { "Content-Type": "application/json" }
    });

    return response.data;
}

export {
    detetectURLS,
    uploadToCloudinary,
    downloadFiles,
    googleLogin,
    deleteFileFromCloudinary,
    formatFileSize,
    formatedDate,
    validateFiles
}