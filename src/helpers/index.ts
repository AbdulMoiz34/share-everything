import { find } from "linkifyjs";
import axios from "axios";

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
        console.log(error);
        return error;
    }
};

export {
    detetectURLS,
    uploadToCloudinary
}