import React from 'react';
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import styles from './app.module.css';
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import {selectedIngredientsData} from "./utils/selected-ingredients-data";

const url = "https://norma.nomoreparties.space/api/ingredients";

function App() {
    const [state, setState] = React.useState({ingredients: null, isLoading: false, hasError: false});

    React.useEffect(() => {
        fetchIngredients();
    }, [])

    function fetchIngredients() {
        setState({...state, isLoading: true});
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error with status code ${res.status} ${res.statusText}`);
            })
            .then(data => setState({ingredients: data.data, isLoading: false, hasError: false}))
            .catch(err => {
                setState({...state, isLoading: false, hasError: true});
                console.error(err);
            });
    }

    return (
        <>
            <AppHeader/>
            <main>
                {state.isLoading && (
                    <div className={"text text_type_main-medium"}>
                        <p>Данные загружаются, подождите, пожалуйста</p>
                    </div>
                )}
                {state.hasError && (
                    <div className={"text text_type_main-medium"}>
                        <p>При загрузке данных произошла ошибка</p>
                    </div>
                )}
                {state.ingredients && (
                    <div className={styles.content}>
                        <BurgerIngredients ingredients={state.ingredients}/>
                        <BurgerConstructor selectedIngredients={selectedIngredientsData}/>
                    </div>
                )}
            </main>
        </>
    );
}

export default App;
