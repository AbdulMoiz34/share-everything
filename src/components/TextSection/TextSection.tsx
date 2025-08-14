import { useEffect, useState } from "react";
import { Heading, TextArea } from "../../components";
import { db, ref, onValue, update, analytics } from "../../firebase";
import { detetectURLS } from "../../helpers";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { logEvent } from "firebase/analytics";


const TextSection = () => {
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [urls, setUrls] = useState<string[]>([]);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        onValue(ref(db, `shares/${id}`), (snapshot) => {
            if (snapshot.val()) {
                setText(snapshot.val().text || "");
                setUrls(detetectURLS(snapshot.val().text || ""));
                if (snapshot.val().text) {
                    setIsSaved(true);
                }
            }
            setLoading(false);
        });
    }, []);

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIsSaved(false);
        setText(e.target.value);
    }

    const saveHandler = async () => {
        if (!id) {
            toast.error("Generate URL Please.");
            return;
        }
        logEvent(analytics, "text_saved", {
            saved_at: new Date().toISOString()
        });
        try {
            await update(ref(db, `shares/${id}`), { text });
            setIsSaved(true);
            setUrls(detetectURLS(text));
        } catch (err) {
            toast.error("something went wrong.");
        }
    }

    const clearHandler = async () => {
        if (!id) {
            toast.error("Generate URL Please.");
            return;
        }
        try {
            await update(ref(db, `shares/${id}`), { text: "" });
            setText("");
            setUrls([]);
            setIsSaved(false);
        } catch (err) {
            toast.error("something went wrong.");
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
    }

    return (
        <div className="text-sec w-[92.85%] box-border h-full py-6 px-10 flex flex-col relative pr-0">
            {loading ?
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                </div>
                :
                <>
                    <Heading text="Text" />
                    <TextArea text={text} onChangeHandler={onChangeHandler} />
                    <div className="flex w-full justify-end gap-4 sm:gap-18 my-4 flex-col sm:flex-row">
                        {text && <button className="cursor-pointer text-xs" onClick={clearHandler}>Clear</button>}
                        <button disabled={!text} onClick={isSaved ? copyToClipboard : saveHandler} className={`disabled:opacity-20 disabled:cursor-default border-2 px-16 py-2 text-xl italic font-[900] cursor-pointer transition duration-100 ${text && "hover:text-blue-600"}`}>{isSaved ? "Copy" : "Save"}</button>
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