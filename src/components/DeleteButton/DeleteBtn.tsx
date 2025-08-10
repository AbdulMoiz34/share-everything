import LinkGeneratorButton from "../LinkGeneratorBoxBtn";
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
interface DeleteBtnProps {
    id: string;
    deleteHandler: () => void;
}

const DeleteBtn = ({ id, deleteHandler }: DeleteBtnProps) => {
    const { confirm } = Modal;

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure?',
            content: "All your data will be erased. If you press 'yes'.",
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteHandler()
            },
            centered: true,
        });
    };

    return (
        <LinkGeneratorButton text="Delete" onClick={showDeleteConfirm} disabled={!id.length} />
    )
}

export default DeleteBtn;