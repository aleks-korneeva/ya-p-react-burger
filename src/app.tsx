import React from 'react';
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import styles from './app.module.css';
import {BurgerConstructor} from "./components/burger-constructor/burger-constructor";

function App() {
    return (
        <>
            <AppHeader/>
            <main>
                <div className={styles.content}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </div>
            </main>
        </>
    );
}

export default App;
