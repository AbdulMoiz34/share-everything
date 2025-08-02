import { useNetworkState } from "@uidotdev/usehooks"
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const NetworkStatus = () => {
    const network = useNetworkState();
    const hasShownToast = useRef<boolean>(false);

    useEffect(() => {
        if (!network.online && !hasShownToast.current) {
            toast.error("you've gone offline");
            hasShownToast.current = true;
        }

        if (hasShownToast.current && network.online) {
            toast.success("you're back.");
            hasShownToast.current = false;
        }

    }, [network.online]);
    return null;
}

export default NetworkStatus;