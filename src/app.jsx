import React, {useEffect} from 'react';
import AppHeader from './components/app-header/app-header'
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import {LoginPage} from "./pages/login-page";
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
import IngredientDetails from "./components/burger-ingredients/ingredient-details/ingredient-details";
import {NotFoundPage} from "./pages/not-found-page/not-found-page";
import {checkUserAuth} from "./services/actions/auth";
import {AppRoute} from "./utils/routes";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(checkUserAuth())
    }, [dispatch])

    const location = useLocation();
    const state = location.state;
    const navigate = useNavigate();

    function handleClose(e) {
        navigate(AppRoute.main);
        e.stopPropagation();
    }

    return (
        <>
            <AppHeader/>
            <main>
                { state?.backgroundLocation && (
                    <Routes>
                        <Route path={`${AppRoute.ingredient}/:id`}  element={<Modal children={<IngredientDetails ingredient={state.item}/>} onCloseCallback={handleClose} />} />
                    </Routes>
                )}
                {/*<Routes location={state || location}>*/}
                <Routes>
                    <Route path={AppRoute.main} element={<HomePage/>}/>
                    <Route path={`${AppRoute.ingredient}/:id`} element={<IngredientPage/>}/>
                    <Route path={AppRoute.login} element={<OnlyUnAuthRoute element={<LoginPage/>}/>}/>
                    <Route path={AppRoute.register} element={<OnlyUnAuthRoute element={<RegistrationPage/>}/>}/>
                    <Route path={AppRoute.forgotPassword} element={<OnlyUnAuthRoute element={<ForgotPasswordPage/>}/>}/>
                    <Route path={AppRoute.resetPassword} element={<OnlyUnAuthRoute element={<ResetPasswordPage/>}/>}/>
                    <Route path={AppRoute.profile} element={<OnlyAuthRoute element={<ProfilePage/>}/>}>
                        <Route index element={<ProfileInfo/>}/>
                        <Route path={AppRoute.orders} element={<ProfileOrders/>}/>
                    </Route>
                    <Route path={AppRoute.notFound} element={<NotFoundPage/>}/>
                </Routes>
            </main>
        </>
    );
}

export default App;
