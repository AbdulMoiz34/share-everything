import LinkGeneratorButton from "../LinkGeneratorBoxBtn";
import ConfirmModal from "../ConfirmModal";

interface DeleteBtnProps {
    id: string;
    deleteHandler: () => void;
}

const DeleteBtn = ({ id, deleteHandler }: DeleteBtnProps) => {
    const showModal = () => {
        ConfirmModal("Are you sure?",
            "All your data will be erased. If you press 'yes'.",
            deleteHandler);
    }

    return (
        <LinkGeneratorButton text="Delete" onClick={showModal} disabled={!id.length} />
    )
}

export default DeleteBtn;