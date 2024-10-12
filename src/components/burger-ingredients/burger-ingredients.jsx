import React, {useEffect, useRef} from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import {IngredientsGroup} from "./ingredient-group/ingredients-group";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import {BUN, MAIN, SAUCE} from '../../utils/ingredient-types';
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";
import {CLOSE_INGREDIENT} from "../../services/actions/current-ingredient";

export default function BurgerIngredients() {
    const {isOpen, ingredientDetails} = useSelector(state => state.currentIngredient);
    const {ingredients, ingredientRequest, ingredientFailed} = useSelector(state => state.ingredients);

    const [activeTab, setActiveTab] = React.useState(BUN);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    function getIngredientsByType(type) {
        return ingredients.filter(e => e.type === type);
    }

    function handleClose(e) {
        dispatch({
            type: CLOSE_INGREDIENT
        })
        e.stopPropagation();
    }

    const groupRefs = {};
    groupRefs[BUN] = useRef(null);
    groupRefs[SAUCE] = useRef(null);
    groupRefs[MAIN] = useRef(null);

    const tabContainerRef = useRef(null);

    function handleTabClick(type) {
        groupRefs[type].current.scrollIntoView({behavior: "smooth"});
        setActiveTab(type)
    }

    function handleScroll() {
        const containerRect = tabContainerRef.current.getBoundingClientRect();
        const distances = [];
        for (const ref of Object.values(groupRefs)) {
            const elementRect = ref.current.getBoundingClientRect();
            const distance = Math.abs(containerRect.bottom - elementRect.top);
            distances.push(distance);
        }

        const minDistance = Math.min(...distances);
        const nearestElementIndex = distances.indexOf(minDistance);
        const nearestElement = Object.keys(groupRefs)[nearestElementIndex];
        setActiveTab(nearestElement);
    }

    return (
        <section className={styles.wrapper}>
            {ingredientRequest ? (<h1>Загрузка</h1>) : ingredientFailed ? (<h1>Ошибка</h1>) : (
                <div>
                    <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
                    <div className={`${styles.tab_container}`} ref={tabContainerRef}>
                        <Tab value={BUN} active={activeTab === BUN} onClick={handleTabClick}>
                            Булки
                        </Tab>
                        <Tab value={SAUCE} active={activeTab === SAUCE} onClick={handleTabClick}>
                            Соусы
                        </Tab>
                        <Tab value={MAIN} active={activeTab === MAIN} onClick={handleTabClick}>
                            Начинки
                        </Tab>
                    </div>
                    <div className={styles.ingredients_container} onScroll={handleScroll}>
                        <IngredientsGroup ref={groupRefs[BUN]} title="Булки" elements={getIngredientsByType(BUN)}
                                          key={BUN}/>
                        <IngredientsGroup ref={groupRefs[SAUCE]} title="Соусы" elements={getIngredientsByType(SAUCE)}
                                          key={SAUCE}/>
                        <IngredientsGroup ref={groupRefs[MAIN]} title="Начинки" elements={getIngredientsByType(MAIN)}
                                          key={MAIN}/>
                    </div>
                </div>
            )}
            {isOpen &&
                <Modal title={"Детали ингредиента"} children={<IngredientDetails ingredient={ingredientDetails}/>}
                       onCloseCallback={handleClose}/>
            }
        </section>
    )
}