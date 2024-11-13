import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "../../app.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../../components/burger-constructor/burger-constructor";
import React from "react";

export const HomePage = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.content}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </div>
        </DndProvider>
    )
}