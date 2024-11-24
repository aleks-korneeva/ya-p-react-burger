import ReactDOM from "react-dom";
import styles from "./preloader.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import React from "react";
import {Oval} from 'react-loader-spinner';

const modalRoot = document.getElementById("modal-element") as HTMLElement;

export const Preloader = ({text = "Загрузка..."}: {text?: string}) => {
    return ReactDOM.createPortal((
        <div className={styles.container}>

            <div className={styles.content}>
                <Oval
                    color='#4c4cff'
                    secondaryColor={"transparent"}
                    visible={true}
                />
                <div className={"text text_type_main-default mt-4"}>{text}</div>
            </div>
            <ModalOverlay/>
        </div>
    ), modalRoot)
}