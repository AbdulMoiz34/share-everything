import { useEffect, useState } from "react";
import { Heading, Loader, TextArea } from "../../components";
import { db, set, ref, onValue, remove } from "../../db/index";

const TextSection = () => {
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
                        if (snapshot.val().text) {
                            setIsSaved(true);
                        }
                    }
                    setLoading(false);
                });
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIsSaved(false);
        setText(e.target.value);
    }

    const saveHandler = async () => {
        setIsSaved(true);
        try {
            await set(ref(db, 'shairing'), { text });
        } catch (err) {
            console.log("error", err);
        }
    }

    const clearHandler = async () => {
        setText("");
        setIsSaved(false);
        try {
            await remove(ref(db, 'shairing'));
        } catch (err) {
            console.log("error", err);
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
    }

    return (
        <div className="w-full h-full py-6 px-10 flex flex-col relative">
            {loading ?
                <Loader /> :
                <>
                    <Heading text="Text" />
                    <TextArea text={text} onChangeHandler={onChangeHandler} />
                    <div className="flex justify-end gap-18 my-4">
                        {text && <button className="cursor-pointer text-xs" onClick={clearHandler}>Clear</button>}
                        <button disabled={!text} onClick={isSaved ? copyToClipboard : saveHandler} className={`disabled:opacity-20 disabled:cursor-default border-2 px-16 py-2 text-xl italic font-[900] cursor-pointer transition duration-100 ${text && "hover:text-[#646EFF]"}`}>{isSaved ? "Copy" : "Save"}</button>
                    </div>
                </>
            }
        </div>
    )
}

export default TextSection;