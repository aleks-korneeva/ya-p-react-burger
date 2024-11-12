import React, {useEffect} from 'react';
import AppHeader from './components/app-header/app-header'
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import {LoginPage} from "./pages/login-page";
import {HomePage} from "./pages/home-page";
import {ResetPasswordPage} from "./pages/registration/reset-password-page";
import {ForgotPasswordPage} from "./pages/registration/forgot-password-page";
import {RegistrationPage} from "./pages/registration/registartion-page";
import {ProfilePage} from "./pages/profile/profile-page";
import {ProfileInfo} from "./pages/profile/profile-info";
import {ProfileOrders} from "./pages/profile/profile-orders";
import {IngredientPage} from "./pages/ingredient-page";
import {useDispatch} from "react-redux";
import {getIngredients} from "./services/actions/ingredients";
import {LogoutPage} from "./pages/logout-page";
import {ProtectedRoute} from "./components/protected-route";
import Modal from "./components/modal/modal";
import IngredientDetails from "./components/burger-ingredients/ingredient-details/ingredient-details";
import {NotFoundPage} from "./pages/not-found-page";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    const location = useLocation();
    const state = location.state;
    const navigate = useNavigate();

    function handleClose(e) {
        navigate(`/`);
        e.stopPropagation();
    }

    return (
        <>
            <AppHeader/>
            <main>
                { state?.backgroundLocation && (
                    <Routes>
                        <Route path={"/ingredients/:id"} element={<Modal children={<IngredientDetails ingredient={state.item}/>} onCloseCallback={handleClose} />} />
                    </Routes>
                )}
                <Routes location={state || location}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                    <Route path={"/ingredients/:id"} element={<IngredientPage />} />
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/register"} element={<RegistrationPage/>}/>
                    <Route path={"/forgot-password"} element={<ForgotPasswordPage/>}/>
                    <Route path={"/reset-password"} element={<ResetPasswordPage/>}/>
                    <Route path="/profile" element={<ProtectedRoute element={<ProfilePage/>} />}>
                        <Route index element={<ProfileInfo />} />
                        <Route path={"orders"} element={<ProfileOrders/>}/>
                        <Route path={"logout"} element={<LogoutPage/>}/>
                    </Route>
                </Routes>
            </main>
        </>
    );
}

export default App;
