import { useState } from "react";
import { FilesSection, Header, MainCard, SideBar, TextSection } from "../../components";

const Home = () => {
    const [type, setType] = useState<"text" | "files">("text");
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