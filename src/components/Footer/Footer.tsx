const Footer = () => {

    return (
        <footer className="text-center py-4 text-sm text-gray-600">
            <div>
                <span className="text-blue-800 font-medium">&copy;<sup>2025 </sup></span>
                <span>share-everything</span>
            </div>
            <div className="mt-1">
                <span className="text-xs">Developed by {" "}</span>
                <a
                    href="https://www.linkedin.com/in/AbdulMoiz34"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline text-xs">
                    Abdul Moiz
                </a>
            </div>
        </footer>
    );
}

export default Footer;