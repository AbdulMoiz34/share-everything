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

    for (let file of files) {
        const fileName: string | undefined = file.name.split(".").pop()?.toLocaleLowerCase();

        if (blockedFiles.has(fileName || "")) {
            return fileName;
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