import React from 'react';
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import styles from './app.module.css';
import {BurgerConstructor} from "./components/burger-constructor/burger-constructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    return (
        <>
            <AppHeader/>
            <main>
                <DndProvider backend={HTML5Backend}>
                    <div className={styles.content}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </div>
                </DndProvider>
            </main>
        </>
    );
}

export default App;
