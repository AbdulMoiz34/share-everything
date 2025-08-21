import ShareLinkGenerator from "../LinkGeneratorBox";
import { useLocation } from "react-router-dom";

interface MainCardProp {
    children: React.ReactNode;
}

const MainCard = ({ children }: MainCardProp) => {
    const location = useLocation();
    const showShare = location.pathname === "/" || location.pathname.startsWith("/view/");
    return (
        <>
            <div className="bg-blue-200 min-w-full min-h-[460px] mt-8 shadow-2xl flex">
                {children}
            </div>
            {showShare && <ShareLinkGenerator />}
        </>
    )
}

export default MainCard;