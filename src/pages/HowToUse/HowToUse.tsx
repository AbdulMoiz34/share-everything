import { FaHome, FaSave, FaShareAlt, FaRegClock } from "react-icons/fa";

const steps = [
    {
        icon: <FaHome size={28} className="text-blue-500" />,
        title: "Go to Homepage",
        description:
            "Visit ShareEverything's homepage to start sharing instantly."
    },
    {
        icon: <FaSave size={28} className="text-green-500" />,
        title: "Write & Save",
        description: "Type or paste the text you want to share, then click the Save button."
    },
    {
        icon: <FaShareAlt size={28} className="text-purple-500" />,
        title: "Share the Link",
        description: "Send your unique link via WhatsApp, LinkedIn, or any platform."
    },
    {
        icon: <FaRegClock size={28} className="text-orange-500" />,
        title: "Quick & Private",
        description: "Your text is stored temporarily for privacy and speed."
    }
];

const HowToUse = () => {
    return (
        <div className="w-full p-4 sm:p-6 lg:p-10 overflow-y-auto">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-center mb-4">
                How to Use <span className="text-blue-600">ShareEverything</span>
            </h1>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
                ShareEverything lets you share text instantly without accounts or complexity.
                Just a few steps and your message is ready to go.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="p-6 border rounded-xl hover:shadow-md transition-shadow bg-white"
                    >
                        <div className="flex items-center gap-4 mb-3">
                            {step.icon}
                            <h2 className="text-lg font-semibold">{step.title}</h2>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                    </div>
                ))}
            </div>

            <p className="mt-10 text-gray-500 text-center italic">
                Fast, private, and easy — that's ShareEverything.
            </p>
        </div>
    );
};

export default HowToUse;