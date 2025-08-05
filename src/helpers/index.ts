import { find } from "linkifyjs";
import axios from "axios";
import JSZip from 'jszip';
import { saveAs } from "file-saver";
import { auth, googleProvider, signInWithPopup } from "../firebase/";

const detetectURLS = (text: string): any[] => {
    const links = find(text);
    return links.map(link => link.href);
}

const uploadToCloudinary = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'fastshare098121321421');
    formData.append('cloud_name', 'moiz34');

    try {
        const response = await axios.post(
            'https://api.cloudinary.com/v1_1/moiz34/auto/upload',
            formData
        );
        return { url: response.data.secure_url, type: file.type, name: file.name };
    } catch (error) {
        return error;
    }
};

interface FileType {
    url: string;
    type: string;
    name: string;
}

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
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (err) {
        throw err;
    }
};

export {
    detetectURLS,
    uploadToCloudinary,
    downloadFiles,
    googleLogin
}