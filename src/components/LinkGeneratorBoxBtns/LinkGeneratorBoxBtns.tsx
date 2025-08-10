import { nanoid } from "nanoid";
import { LinkGeneratorButton } from "../../components/";
import toast from "react-hot-toast";
import { db, ref, remove } from "../../firebase";
import { useNavigate } from "react-router-dom";

interface LinkGeneratorBoxBtnsProps {
    id: string;
    setId: (id: string) => void
}

const LinkGeneratorBoxBtns = ({ id, setId }: LinkGeneratorBoxBtnsProps) => {
    const navigate = useNavigate();

    const generateId = () => {
        const id = nanoid(6);
        setId(id);
        toast.success("Generated.");
    };

    const cancelHandler = async () => {
        localStorage.removeItem("id");
        setId("");
        navigate("");
        try {
            await remove(ref(db, `shares/${id}`));
            toast.success("Done.");
        } catch (err) {
            toast.error("something went wrong.");
        }
    }

    const saveHandler = () => {
        localStorage.setItem("id", id);
        navigate(`/view/${id}`);
        toast.success("Saved.");
    }

    const copyUrlHandler = () => {
        navigator.clipboard.writeText(`https://share-everything.netlify.app/view/${id}`);
        toast.success("copied.");
    }

    return (
        <div className="flex gap-4">
            <LinkGeneratorButton text="Generate" onClick={generateId} disabled={!!id.length} />
            <LinkGeneratorButton text="Cancel" onClick={cancelHandler} disabled={!id.length} />
            <LinkGeneratorButton text="Save" onClick={saveHandler} disabled={!id.length} />
            <LinkGeneratorButton text="Copy" onClick={copyUrlHandler} disabled={!id.length} />
        </ div>

    )
}

export default LinkGeneratorBoxBtns;