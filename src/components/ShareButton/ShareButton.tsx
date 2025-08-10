import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    ThreadsIcon,
    ThreadsShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";

interface ShareButtonProps {
    name: string;
    url: string;
}
const ShareButton = ({ name, url }: ShareButtonProps) => {
    const title = "Check this out!";

    let Button: React.ReactNode;
    switch (name) {
        case "linkedin":
            Button = <LinkedinShareButton url={url} title={title}>
                <LinkedinIcon size={40} round />
            </LinkedinShareButton>
            break;
        case "whatsapp":
            Button = <WhatsappShareButton url={url} title={title}>
                <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            break;
        case "email":
            Button = <EmailShareButton url={url} title={title}>
                <EmailIcon size={40} round />
            </EmailShareButton>
            break;
        case "thread":
            Button = <ThreadsShareButton url={url} title={title}>
                <ThreadsIcon size={40} round />
            </ThreadsShareButton>
            break;
        case "twitter":
            Button = <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={40} round />
            </TwitterShareButton>
            break;
        case "facebook":
            Button = <FacebookShareButton url={url} title={title}>
                <FacebookIcon size={40} round />
            </FacebookShareButton>
    }

    return Button;
}

export default ShareButton;