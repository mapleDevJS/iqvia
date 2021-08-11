import styles from './Button.module.scss';

type Props = {
    className?: string;
    onClick: () => void;
    text: string;
};

const Button: React.FC<Props> = ({ className, onClick, text }) => {
    return (
        <button className={`${styles.button} ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
