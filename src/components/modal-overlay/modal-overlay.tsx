import styles from './modal-overlay.module.css'

type TProps = {
    onClick?: () => void;
}

export default function ModalOverlay ({onClick}: TProps) {
    return (
        <div className={styles.overlay} onClick={onClick}></div>
    )
}