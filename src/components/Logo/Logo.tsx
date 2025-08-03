const Logo = () => {
    return (
        <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
                </linearGradient>
            </defs>

            <text x="80" y="30" fontFamily="Arial" fontSize="16" fontStyle="italic" fill="url(#blueGradient)">
                Share
            </text>
            <text x="10" y="60" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="url(#blueGradient)">
                Everything
            </text>
        </svg>
    );
};

export default Logo;