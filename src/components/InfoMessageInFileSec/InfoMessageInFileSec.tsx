import { CiCircleInfo } from "react-icons/ci";

const InfoMessageInFileSec = () => {
    return (
        < div className="flex gap-1 mt-2 justify-center sm:items-center">
            <CiCircleInfo className="text-red-600 sm:text-lg" />
            <p className="text-red-500 text-xs sm:text-sm text-center">
                Files will automatically be deleted after <span className="font-bold">2 days</span>.
            </p>
        </div>
    )
}

export default InfoMessageInFileSec;