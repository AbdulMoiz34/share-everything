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

    const MAX_FILE_SIZE = 10 * 1024 * 1024;   // 10 MB
    const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB

    for (const file of files) {
        const fileName: string | undefined = file.name.split(".").pop()?.toLowerCase();
        const isVideo = file.type.startsWith("video/");

        if (blockedFiles.has(fileName || "")) {
            return `File type .${fileName} is not allowed.`;
        } else if (isVideo && MAX_VIDEO_SIZE < file.size) {
            return "Your video is too large. Max size is 100MB";
        } else if (!isVideo && MAX_FILE_SIZE < file.size) {
            return "Your file is too large. Max size is 10MB";
        }
    }

    return true;
}

const googleLogin = async () => {
    await signInWithPopup(auth, googleProvider);
};

export {
    detetectURLS,
    downloadFiles,
    googleLogin,
    formatFileSize,
    formatedDate,
    validateFiles
}