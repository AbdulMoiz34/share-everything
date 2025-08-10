import { useState } from 'react';
import { Divider, Modal } from 'antd';
import { ShareButton } from "..";

interface ShareBtnsModalProps {
    url: string;
}

const ShareBtnsModal = ({ url }: ShareBtnsModalProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };


    const hideModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={showModal} className="cursor-pointer hover:text-blue-600 ml-4">Share</button>
            <Modal
                centered
                title="Share"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onCancel={hideModal}
                footer={null}
            >
                <Divider className='bg-blue-700' />
                <div className='mt-8 flex gap-4 flex-wrap justify-center'>
                    <ShareButton url={url} name="linkedin" />
                    <ShareButton url={url} name="facebook" />
                    <ShareButton url={url} name="twitter" />
                    <ShareButton url={url} name="thread" />
                    <ShareButton url={url} name="whatsapp" />
                    <ShareButton url={url} name="email" />
                </div>
            </Modal>
        </>
    );
};

export default ShareBtnsModal;