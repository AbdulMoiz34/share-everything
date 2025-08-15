import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShareBtnsModal, LinkGeneratorBoxBtns } from "../../components/";

const LinkGeneratorBox = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [id, setId] = useState<string>(location.pathname.slice(6));
    const url: string = `https://share.../${id ? `view/${id}` : ""}`;

    useEffect(() => {
        const getPreviousId = localStorage.getItem("id");
        if (getPreviousId && !id) {
            navigate(`/view/${getPreviousId}`);
            setId(getPreviousId);
        }
    }, []);

    return (
        <div className="bg-blue-300 px-4 text-sm py-4 flex gap-4 flex-col items-center sm:items-start sm:flex-row">
            <input type="text" placeholder=" id" value={url} className="flex-1 text-center sm:text-start text-blue-900 lg:text-lg border-none outline-none w-full" readOnly />
            <div className="flex text-xs sm:text-sm text-blue-900">
                <LinkGeneratorBoxBtns id={id} setId={setId} />
                <ShareBtnsModal id={id} />
            </div>
        </div>
    )
}

export default LinkGeneratorBox;