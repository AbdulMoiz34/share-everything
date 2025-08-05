import React from 'react';
import {
    FiUpload,
    FiLogIn,
    FiShield,
    FiArrowRightCircle,
    FiEdit2,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Heading } from '../../components';

const features = [
    {
        icon: <FiEdit2 className="w-6 h-6 text-blue-600" />,
        title: 'Share Text Instantly',
        description: 'Need to share quick notes, code snippets, or messages? Just type and share like a file.',
    },
    {
        icon: <FiUpload className="w-6 h-6 text-blue-600" />,
        title: 'Upload up to 10 Files Instantly',
        description: 'No login required — upload and share up to 10 files immediately via a public link.',
    },
    {
        icon: <FiLogIn className="w-6 h-6 text-blue-600" />,
        title: 'Login to Unlock More',
        description: 'Logged-in users can share more than 10 files, your files will be secured and encrypted.',
    },
    {
        icon: <FiShield className="w-6 h-6 text-blue-600" />,
        title: 'Private & Temporary Sharing',
        description: 'Your files and text are encrypted and auto-expire in 30mins — only accessible to users with the link.',
    },
];

const HowToUseIt: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <Heading text="How To Use?" />
            <div className="space-y-6 mt-4">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 bg-blue-50 shadow-md p-5 rounded-xl border hover:shadow-lg transition"
                    >
                        <div className="mt-1">{item.icon}</div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-10">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                    Start Sharing
                    <FiArrowRightCircle className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
};

export default HowToUseIt;
