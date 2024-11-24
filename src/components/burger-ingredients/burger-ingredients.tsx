import React, {RefObject, useRef} from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import {IngredientsGroup} from "./ingredient-group/ingredients-group";
import {useSelector} from "react-redux";
import {BUN, MAIN, SAUCE} from '../../utils/ingredient-types';
import {TIngredient, TIngredientsType} from "../../utils/types";

type TTabRef = {
    [tabKey in TIngredientsType]?: RefObject<HTMLHeadingElement>;
}

export default function BurgerIngredients(): React.JSX.Element {
    //@ts-ignore
    const {ingredients, ingredientRequest, ingredientFailed} = useSelector(state => state.ingredients);

    const [activeTab, setActiveTab] = React.useState(BUN);

    function getIngredientsByType(type: string) {
        return ingredients.filter((e: TIngredient) => e.type === type);
    }

    const groupRefs: TTabRef = {};
    groupRefs[BUN] = useRef<HTMLHeadingElement>(null);
    groupRefs[SAUCE] = useRef<HTMLHeadingElement>(null);
    groupRefs[MAIN] = useRef<HTMLHeadingElement>(null);

    const tabContainerRef = useRef<HTMLDivElement>(null);

    function handleTabClick(type: string) {
        groupRefs[type as TIngredientsType]?.current?.scrollIntoView({behavior: "smooth"});
        setActiveTab(type)
    }

    function handleScroll() {
        const containerRect = tabContainerRef.current?.getBoundingClientRect();
        const distances = [];
        for (const ref of Object.values(groupRefs)) {
            const elementRect = ref.current?.getBoundingClientRect();
            if (containerRect?.bottom && elementRect?.top) {
                const distance = Math.abs(containerRect?.bottom - elementRect.top);
                distances.push(distance);
            }
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
        </section>
    )
}