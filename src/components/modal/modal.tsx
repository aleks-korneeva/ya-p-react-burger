import React from "react";
import ReactDOM from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css'

type TProps = {
    title?: string;
    children: React.JSX.Element;
    onCloseCallback: (e?: Event) => void
}

const modalRoot = document.getElementById("modal-element") as HTMLElement;

export default function Modal ({title, children, onCloseCallback}: TProps){
    React.useEffect(() => {
            document.addEventListener("keydown", handleEscapeKeyDown);
            return () => {
                document.removeEventListener("keydown", handleEscapeKeyDown);
            }
        }, []
    )

    const handleEscapeKeyDown = React.useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            onCloseCallback(e);
        }
    }, [onCloseCallback])

    return ReactDOM.createPortal((
        <div className={styles.container}>
            <div className={styles.dialog}>
                <div className={styles.header}>
                    <h1 className={"text text_type_main-large"}>{title}</h1>
                    <CloseIcon type="primary" onClick={onCloseCallback} className={styles.close_icon} />
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
            <ModalOverlay onClick={onCloseCallback}/>
        </div>
    ), modalRoot)
}