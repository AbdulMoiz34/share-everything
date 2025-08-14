import { find } from "linkifyjs";
import axios from "axios";
import JSZip from 'jszip';
import { saveAs } from "file-saver";
import { auth, googleProvider, signInWithPopup } from "../firebase/";
import type { FileType } from "../components/FilesSection/FilesSection";

const detetectURLS = (text: string): string[] => {
    const links = find(text);
    return links.map(link => link.href);
}

interface UploadedFile {
    url: string;
    type: string;
    name: string;
    public_id: string;
    createdAt: number;
}

const uploadToCloudinary = async (file: File): Promise<UploadedFile> => {
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

        return { url, public_id, type: file.type, name: file.name, createdAt: Date.now() };
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

const googleLogin = async () => {
    await signInWithPopup(auth, googleProvider);
};

const deleteFileFromCloudinary = async (public_id: string) => {
    const response = await axios.delete("https://share-everthing-backend-production-d5e7.up.railway.app/api/delete-resource", {
        data: {
            public_id,
            resource_type: "image"
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
    deleteFileFromCloudinary
}