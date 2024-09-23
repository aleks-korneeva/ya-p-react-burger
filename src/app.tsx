import React from 'react';
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import styles from './app.module.css';
import burgersData from './utils/ingredients-data';
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import {selectedIngredientsData} from "./utils/selected-ingredients-data";

function App() {
    return (
        <>
            <AppHeader/>
            <main >
                <div className={styles.content}>
                    <BurgerIngredients ingredients={burgersData}/>
                    <BurgerConstructor selectedIngredients={selectedIngredientsData}/>
                </div>
            </main>
        </>
    );
}

export default App;
