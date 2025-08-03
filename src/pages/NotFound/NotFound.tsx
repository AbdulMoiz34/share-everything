import { Link } from "react-router-dom";
import { Heading } from "../../components";

const NotFound = () => {
    return (
        <div className="w-full flex justify-center items-center flex-col gap-4">
            <Heading text="404 Not Found" />
            <p className="text-gray-600 ">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="text-blue-600 hover:underline">Go back home</Link>
        </div>
    )
}

export default NotFound;