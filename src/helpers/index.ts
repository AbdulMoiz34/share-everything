import { find } from "linkifyjs";
import axios from "axios";
import JSZip from 'jszip';
import { saveAs } from "file-saver";

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
        try {
            const response = await axios.get(url, { responseType: 'blob' });
            const blob = response.data;
            const name = url.substring(url.lastIndexOf('/') + 1);
            zip.file(name, blob);
        } catch (err) {
            throw err;
        }
    }

    try {
        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, "AllFiles");
    } catch (err) {
        throw err;
    }
}

export {
    detetectURLS,
    uploadToCloudinary,
    downloadFiles
}