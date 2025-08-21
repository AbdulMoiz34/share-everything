import ShareLinkGenerator from "../LinkGeneratorBox";

interface MainCardProp {
    children: React.ReactNode;
}

const MainCard = ({ children }: MainCardProp) => {
    return (
        <>
            <div className="bg-blue-200 min-w-full min-h-[460px] mt-8 shadow-2xl flex">
                {children}
            </div>
            <ShareLinkGenerator />
        </>
    )
}

export default MainCard;