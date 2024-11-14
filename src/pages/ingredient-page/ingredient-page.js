import IngredientDetails from "../../components/burger-ingredients/ingredient-details/ingredient-details";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import styles from './ingredient-page.module.css'

export const IngredientPage = () => {
    const {id} = useParams();
    const {ingredients} = useSelector(state => state.ingredients);
    const ingredient = useMemo(() => ingredients.find(i => i._id === id), [ingredients, id]);

    return (
        <div className={styles.container}>
            { ingredient ?
                <div>
                    <h1 className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</h1>
                    <IngredientDetails ingredient={ingredient}/>
                </div>
                :
                <div></div>
            }
        </div>
    )
}