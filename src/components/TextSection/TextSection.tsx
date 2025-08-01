import { useEffect, useState } from "react";
import { Heading, Loader, TextArea } from "../../components";
import { db, set, ref, onValue, remove } from "../../db";
import { detetectURLS } from "../../helpers";

const TextSection = () => {
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [urls, setUrls] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await onValue(ref(db, 'text-sharing'), (snapshot) => {
                    if (snapshot.val()) {
                        setText(snapshot.val().text || "");
                        setUrls(detetectURLS(snapshot.val().text || ""));
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
        setUrls(detetectURLS(text));
        try {
            await set(ref(db, 'text-sharing'), { text });
        } catch (err) {
            console.log("error", err);
        }
    }

    const clearHandler = async () => {
        setText("");
        setUrls([]);
        setIsSaved(false);
        try {
            await remove(ref(db, 'text-sharing'));
        } catch (err) {
            console.log("error", err);
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
    }

    return (
        <div className="text-sec w-[92.85%] box-border h-full py-6 px-10 flex flex-col relative pr-0">
            {loading ?
                <Loader /> :
                <>
                    <Heading text="Text" />
                    <TextArea text={text} onChangeHandler={onChangeHandler} />
                    <div className="flex w-full justify-end gap-18 my-4">
                        {text && <button className="cursor-pointer text-xs" onClick={clearHandler}>Clear</button>}
                        <button disabled={!text} onClick={isSaved ? copyToClipboard : saveHandler} className={`disabled:opacity-20 disabled:cursor-default border-2 px-16 py-2 text-xl italic font-[900] cursor-pointer transition duration-100 ${text && "hover:text-[#646EFF]"}`}>{isSaved ? "Copy" : "Save"}</button>
                    </div>
                    <div className="links w-10/12">

                        {urls.map((url, idx) => (
                            <div key={idx} className="truncate">
                                <a className="text-lg text-blue-500 hover:underline" href={url} target="_blank">{url}</a>
                                <br />
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default TextSection;