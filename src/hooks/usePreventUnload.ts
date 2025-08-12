import { useEffect } from "react";

const usePreventUnload = (isUploading: boolean) => {
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event?.preventDefault();
            (event as BeforeUnloadEvent).returnValue = '';
        }

        if (isUploading) {
            window.addEventListener("beforeunload", handleBeforeUnload);
        }

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        }
    }, [isUploading]);
}

export default usePreventUnload;