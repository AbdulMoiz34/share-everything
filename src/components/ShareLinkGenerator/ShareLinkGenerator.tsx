import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, ref, remove } from "../../firebase";
import toast from "react-hot-toast";

const ShareLinkGenerator = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [id, setId] = useState<string>(location.pathname.slice(6));

    useEffect(() => {
        const id = localStorage.getItem("id");
        if (id) {
            navigate(`/view/${id}`);
            setId(id);
        }
    }, []);

    const generateId = () => {
        const id = nanoid(6);
        setId(id);
    };

    const saveHandler = () => {
        localStorage.setItem("id", id);
        navigate(`/view/${id}`);
    }

    const copyUrlHandler = () => {
        navigator.clipboard.writeText(`https://networking-sharing.com/${id}`);
        toast.success("copied.");
    }

    const cancelHandler = async () => {
        localStorage.removeItem("id");
        setId("");
        navigate("");
        try {
            await remove(ref(db, `shares/${id}`));
        } catch (err) {
            toast.error("something went wrong.");
        }
    }
    return (
        <div className="bg-blue-300 px-4 text-sm py-2 flex">
            <input type="text" placeholder=" id" value={`https://networking-sharing.com/${id}`} className="border-none outline-none w-full" readOnly />
            <div className="flex gap-4">
                <button onClick={generateId} className="cursor-pointer hover:text-blue-800">Generate</button>
                <button disabled={!id.length} onClick={cancelHandler} className="disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer hover:text-blue-800">Cancel</button>
                <button onClick={copyUrlHandler} disabled={!id.length} className="disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer hover:text-blue-800">Copy</button>
                <button onClick={saveHandler} disabled={!id.length} className="disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer hover:text-blue-800">Save</button>
            </div>
        </div>
    )
}

export default ShareLinkGenerator;