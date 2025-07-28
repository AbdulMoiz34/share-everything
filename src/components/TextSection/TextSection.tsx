import { useRef, useState } from "react";
import { Heading } from "../../components";

const TextSection = () => {
    const textArea = useRef<HTMLTextAreaElement | null>(null);
    const [text, setText] = useState<string>("");

    const onChangeHandler = () => {
        if (textArea.current) {
            setText(textArea.current.value);
            textArea.current.style.height = "100%";
            textArea.current.style.height = textArea.current.scrollHeight + 'px';
        }
    }

    const saveHandler = () => {
        console.log(textArea.current?.value);
    }

    const clearHandler = () => {
        if (textArea.current) {
            setText("");
            textArea.current.style.height = "100%";
        }
    }
    return (
        <div className="w-full h-full py-6 px-10 flex flex-col">
            <Heading text="Text" />
            <textarea value={text} onInput={onChangeHandler} ref={textArea} placeholder="Type something..." className="overflow-hidden mt-6 text-lg outline-none resize-none placeholder: placeholder:font-sans w-full h-full placeholder:text-gray-400"></textarea>
            <div className="flex justify-end gap-18 my-4">
                {text && <button className="cursor-pointer text-xs" onClick={clearHandler}>Clear</button>}
                <button disabled={!text} onClick={saveHandler} className={`disabled:opacity-20 disabled:cursor-default border-2 px-16 py-2 text-xl italic font-[900] cursor-pointer transition duration-100 ${text && "hover:text-[#646EFF]"}`}>Save</button>
            </div>
        </div>
    )
}

export default TextSection;