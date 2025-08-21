import { Link } from "react-router-dom";

interface AuthLinkProps {
    text: string;
    linkText: string;
};

const AuthLink = ({ text, linkText }: AuthLinkProps) => {
    return (
        <div className="text-center text-gray-800">
            <span>{text}</span>
            <Link to={`/${linkText}`} className="ml-1 text-blue-500 hover:underline hover:text-blue-700 capitalize">{linkText}</Link>
        </div>
    );
}

export default AuthLink;