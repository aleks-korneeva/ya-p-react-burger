import React from "react";
import ReactDOM from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import styles from './modal.module.css'

const modalRoot = document.getElementById("modal-element");

export default function Modal ({title, children, onCloseCallback}){
    React.useEffect(() => {
            document.addEventListener("keydown", handleEscapeKeyDown);
            return () => {
                document.removeEventListener("keydown", handleEscapeKeyDown);
            }
        }, []
    )

    const handleEscapeKeyDown = React.useCallback((e) => {
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

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    onCloseCallback: PropTypes.func.isRequired,
}