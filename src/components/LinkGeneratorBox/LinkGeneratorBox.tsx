import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShareBtnsModal, LinkGeneratorBoxBtns } from "../../components/";

const LinkGeneratorBox = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [id, setId] = useState<string>(location.pathname.slice(6));
    const url: string = `https://share-everything.netlify.app/view/${id}`;

    useEffect(() => {
        const getPreviousId = localStorage.getItem("id");
        if (getPreviousId && !id) {
            navigate(`/view/${getPreviousId}`);
            setId(getPreviousId);
        }
    }, []);

    return (
        <div className="bg-blue-300 px-4 text-sm py-4 flex">
            <input type="text" placeholder=" id" value={url} className="text-lg border-none outline-none w-full" readOnly />
            <LinkGeneratorBoxBtns id={id} setId={setId} />
            <ShareBtnsModal url={url} />
        </div>
    )
}

export default LinkGeneratorBox;