import { useEffect, useRef } from "react";

interface TextAreaProps {
    text: string;
    onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ text, onChangeHandler }: TextAreaProps) => {
    const textArea = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textArea.current) {
            textArea.current.style.height = "100%";
            textArea.current.style.height = textArea.current.scrollHeight + 'px';
        }
    }, [text]);
    // const resizeTextArea = () => {
    //     if (textArea.current) {
    //         textArea.current.style.height = "100%";
    //         textArea.current.style.height = textArea.current.scrollHeight + 'px';
    //     }
    // }

    return (
        <textarea
            value={text}
            onChange={onChangeHandler}
            ref={textArea}
            placeholder="Type something..."
            className="overflow-hidden mt-6 text-xl outline-none resize-none placeholder: placeholder:font-sans w-full h-full placeholder:text-gray-400">
        </textarea>
    )
}

export default TextArea;