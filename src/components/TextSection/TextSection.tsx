import { useEffect, useRef, useState } from "react";
import { Heading } from "../../components";
import { db, set, ref, onValue, remove } from "../../db/index";

const TextSection = () => {
    const textArea = useRef<HTMLTextAreaElement | null>(null);
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {

            try {
                setLoading(true);
                await onValue(ref(db, 'shairing'), (snapshot) => {
                    if (snapshot.val()) {
                        setText(snapshot.val().text || "");
                    }
                    if (text) {
                        setIsSaved(true);
                    }
                    setLoading(false);
                });
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const onChangeHandler = () => {
        if (textArea.current) {
            setIsSaved(false);
            setText(textArea.current.value);
            textArea.current.style.height = "100%";
            textArea.current.style.height = textArea.current.scrollHeight + 'px';
        }
    }

    const saveHandler = async () => {
        setIsSaved(true);
        console.log(textArea.current?.value);
        try {
            await set(ref(db, 'shairing'), {
                text: textArea.current?.value
            });
        } catch (err) {
            console.log("error", err);
        }
    }

    const clearHandler = async () => {
        if (textArea.current) {
            setText("");
            setIsSaved(false);
            await remove(ref(db, 'shairing'));
            textArea.current.style.height = "100%";
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
    }

    return (
        <div className="w-full h-full py-6 px-10 flex flex-col">
            <Heading text="Text" />
            <textarea value={loading ? "Loading..." : text} onInput={onChangeHandler} ref={textArea} placeholder="Type something..." className="overflow-hidden mt-6 text-xl outline-none resize-none placeholder: placeholder:font-sans w-full h-full placeholder:text-gray-400"></textarea>
            <div className="flex justify-end gap-18 my-4">
                {text && <button className="cursor-pointer text-xs" onClick={clearHandler}>Clear</button>}
                <button disabled={!text} onClick={isSaved ? copyToClipboard : saveHandler} className={`disabled:opacity-20 disabled:cursor-default border-2 px-16 py-2 text-xl italic font-[900] cursor-pointer transition duration-100 ${text && "hover:text-[#646EFF]"}`}>{isSaved ? "Copy" : "Save"}</button>
            </div>
        </div>
    )
}

export default TextSection;