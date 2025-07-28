import { useState } from "react";
import { FilesSection, SideBar, TextSection } from "../../components";

const MainCard = () => {
    const [type, setType] = useState<string>("text");

    return (
        <div className="bg-white min-h-[460px] mt-8 shadow-2xl flex">
            <SideBar type={type} setType={setType} />
            <div className="w-full min-h-full">
                {type == "text" ? <TextSection /> : <FilesSection />}
            </div>
        </div>
    )
}

export default MainCard;    