import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

const ConfirmModal = (title: string, content: string, onConfirm: () => void) => {
    const { confirm } = Modal;

    const showModal = () => {
        confirm({
            title: title,
            content: content,
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            centered: true,
            onOk() {
                onConfirm()
            },
        });
    };

    showModal();
    return null;
}

export default ConfirmModal;