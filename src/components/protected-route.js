import { useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {Preloader} from "./preloader";
import {AppRoute} from "../utils/routes";
import PropTypes from "prop-types";

const ProtectedRoute = ({element, onlyUnAuth = false}) => {
    const { user } = useSelector(state => state.auth);
    const isAuthChecked = useSelector(state => state.auth);
    const location = useLocation();

    if (!isAuthChecked) {
        return <Preloader />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to={AppRoute.login} state={{from: location}} />
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: AppRoute.main } };
        return <Navigate to={from} />
    }

    return element;
}

ProtectedRoute.propsType = {
    element: PropTypes.element.isRequired,
    onlyUnAuth: PropTypes.bool.isRequired
}

export const OnlyAuthRoute = ProtectedRoute;
export const OnlyUnAuthRoute = ({element}) => {
    return (
        <ProtectedRoute element={element} onlyUnAuth={true} />
    )
}