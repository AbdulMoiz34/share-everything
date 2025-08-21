import { nanoid } from "nanoid";
import { DeleteBtn, LinkGeneratorButton } from "../../components/";
import toast from "react-hot-toast";
import { db, ref, remove } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDeleteResourceMutation } from "../../store/services/filesApi";
import { setFiles } from "../../store/reducers/fileReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface LinkGeneratorBoxBtnsProps {
    id: string;
    setId: (id: string) => void
}

const LinkGeneratorBoxBtns = ({ id, setId }: LinkGeneratorBoxBtnsProps) => {
    const navigate = useNavigate();
    const [deleteResource] = useDeleteResourceMutation();
    const dispatch = useAppDispatch();
    const files = useAppSelector((s) => s.fileUpload.files);

    const generateId = () => {
        const id = nanoid(6);
        setId(id);
        toast.success("Generated.");
    };

    const deleteHandler = async () => {
        toast.loading("Deleting..");

        const promises = files.map(file => {
            return deleteResource({ public_id: file.public_id, resource_type: file.resource_type }).unwrap();
        })

        try {
            await Promise.all(promises);
            await remove(ref(db, `shares/${id}`));
            localStorage.removeItem("id");
            setId("");
            navigate("");
            toast.dismiss();
            toast.success("Done.");
            dispatch(setFiles([]));
        } catch (err) {
            toast.dismiss();
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
            <DeleteBtn id={id} deleteHandler={deleteHandler} />
            <LinkGeneratorButton text="Save" onClick={saveHandler} disabled={!id.length} />
            <LinkGeneratorButton text="Copy" onClick={copyUrlHandler} disabled={!id.length} />
        </ div>

    )
}

export default LinkGeneratorBoxBtns;