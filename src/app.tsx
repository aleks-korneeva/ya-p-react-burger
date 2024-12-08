import React, {useEffect} from 'react';
import AppHeader from './components/app-header/app-header'
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import {LoginPage} from "./pages/login-page/login-page";
import {HomePage} from "./pages/home-pahe/home-page";
import {ResetPasswordPage} from "./pages/registration/reset-password-page";
import {ForgotPasswordPage} from "./pages/registration/forgot-password-page";
import {RegistrationPage} from "./pages/registration/registartion-page";
import {ProfilePage} from "./pages/profile/profile-page";
import {ProfileInfo} from "./pages/profile/profile-info";
import {ProfileOrders} from "./pages/profile/profile-orders";
import {IngredientPage} from "./pages/ingredient-page/ingredient-page";
import {useDispatch} from "react-redux";
import {getIngredients} from "./services/actions/ingredients";
import {OnlyAuthRoute, OnlyUnAuthRoute} from "./components/protected-route";
import Modal from "./components/modal/modal";
import {IngredientDetails} from "./components/burger-ingredients/ingredient-details/ingredient-details";
import {NotFoundPage} from "./pages/not-found-page/not-found-page";
import {checkUserAuth} from "./services/actions/auth";
import {AppRoute} from "./utils/routes";
import {OrderInfoPage} from "./pages/order-info-page/order-info-page";
import {OrderPage} from "./pages/orders-page/order-page";
import {OrderInfo} from "./components/order/order-info/order-info";
import {AppDispatch} from "./services/types";

function App() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(checkUserAuth())
    }, [dispatch])

    const location = useLocation();
    const state = location.state;
    const navigate = useNavigate();

    function handleClose(e?: Event) {
        navigate(state?.backgroundLocation);
        e?.stopPropagation();
    }

    return (
        <>
            <AppHeader/>
            <main>
                { state?.backgroundLocation && (
                    <Routes>
                        <Route path={`${AppRoute.INGREDIENTS}/:id`} element={<Modal children={<IngredientDetails ingredient={state.item}/>} title={"Детали ингредиента"} onCloseCallback={handleClose} />} />
                        <Route path={`${AppRoute.FEED}/:number`} element={<Modal children={<OrderInfo order={state.item}/>} title={`#${state.item.number}`} onCloseCallback={handleClose} />}/>
                    </Routes>
                )}
                <Routes location={state?.backgroundLocation || location}>
                    <Route path={AppRoute.HOME} element={<HomePage/>}/>
                    <Route path={`${AppRoute.INGREDIENTS}/:id`} element={<IngredientPage/>}/>
                    <Route path={`${AppRoute.FEED}/:number`} element={<OrderInfoPage/>}/>
                    <Route path={`${AppRoute.FEED}`} element={<OrderPage/>}/>
                    <Route path={AppRoute.LOGIN} element={<OnlyUnAuthRoute element={<LoginPage/>}/>}/>
                    <Route path={AppRoute.REGISTER} element={<OnlyUnAuthRoute element={<RegistrationPage/>}/>}/>
                    <Route path={AppRoute.FORGOT_PASSWORD} element={<OnlyUnAuthRoute element={<ForgotPasswordPage/>}/>}/>
                    <Route path={AppRoute.RESET_PASSWORD} element={<OnlyUnAuthRoute element={<ResetPasswordPage/>}/>}/>
                    <Route path={AppRoute.PROFILE} element={<OnlyAuthRoute element={<ProfilePage/>}/>}>
                        <Route index element={<ProfileInfo/>}/>
                        <Route path={AppRoute.ORDERS} element={<ProfileOrders/>}/>
                    </Route>
                    <Route path={AppRoute.NOT_FOUND} element={<NotFoundPage/>}/>
                </Routes>
            </main>
        </>
    );
}

export default App;
