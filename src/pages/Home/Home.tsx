import { useEffect, useState } from "react";
import { FilesSection, SideBar, TextSection } from "../../components";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [type, setType] = useState<"text" | "files">("text");
    const navigate = useNavigate();

    return (
        <div className="w-full mx-auto flex">
            <SideBar type={type} setType={setType} />
            <div className="w-full min-h-full">
                {type == "text" ? <TextSection /> : <FilesSection />}
            </div>
        </div>
    )
}

export default Home;