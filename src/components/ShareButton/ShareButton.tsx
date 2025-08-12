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

    let Button: React.ReactNode;
    switch (name) {
        case "linkedin":
            Button = <LinkedinShareButton url={url}>
                <LinkedinIcon size={40} round />
            </LinkedinShareButton>
            break;
        case "whatsapp":
            Button = <WhatsappShareButton url={url}>
                <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            break;
        case "email":
            Button = <EmailShareButton url={url}>
                <EmailIcon size={40} round />
            </EmailShareButton>
            break;
        case "thread":
            Button = <ThreadsShareButton url={url}>
                <ThreadsIcon size={40} round />
            </ThreadsShareButton>
            break;
        case "twitter":
            Button = <TwitterShareButton url={url}>
                <TwitterIcon size={40} round />
            </TwitterShareButton>
            break;
        case "facebook":
            Button = <FacebookShareButton url={url}>
                <FacebookIcon size={40} round />
            </FacebookShareButton>
    }

    return Button;
}

export default ShareButton;