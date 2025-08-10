interface LinkGeneratorBoxProps {
    onClick: () => void;
    text: string;
    disabled: boolean
}

const LinkGeneratorButton = ({ onClick, text, disabled }: LinkGeneratorBoxProps) => {
    return <button disabled={disabled} onClick={onClick} className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">{text}</button>
}


export default LinkGeneratorButton;