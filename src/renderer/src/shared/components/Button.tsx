interface Props {
    onClick: () => void;
    text: String;
    icon?: JSX.Element;
    secondary?: boolean;
}

export default function Button({
    onClick,
    text,
    icon,
    secondary = false,
}: Props) {
    return (
        <button
            className={`play ${secondary ? 'secondary' : ''}`}
            onClick={onClick}
        >
            {icon && <div className="icon">{icon}</div>}
            <div className="text">{text}</div>
        </button>
    );
}
