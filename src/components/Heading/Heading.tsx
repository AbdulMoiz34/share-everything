type HeadingProps = {
    text: string;
}

const Heading = ({ text }: HeadingProps) => {

    return <h1 className="text-5xl font-bold text-blue-800 text-center">{text}</h1>
}

export default Heading;