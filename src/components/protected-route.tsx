import {Navigate, useLocation} from "react-router-dom";
import {Preloader} from "./preloader/preloader";
import {AppRoute} from "../utils/routes";
import {useSelector} from "../hooks/hooks";

type TProps = {
    element: React.JSX.Element;
    onlyUnAuth?: boolean;
}

const ProtectedRoute = ({element, onlyUnAuth = false} : TProps) => {
    const { user } = useSelector(state => state.auth);
    const isAuthChecked = useSelector(state => state.auth);
    const location = useLocation();

    if (!isAuthChecked) {
        return <Preloader />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to={AppRoute.LOGIN} state={{from: location}} />
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: AppRoute.HOME } };
        return <Navigate to={from} />
    }

    return element;
}

export const OnlyAuthRoute = ProtectedRoute;
export const OnlyUnAuthRoute = ({element}: Pick<TProps, "element">) => {
    return (
        <ProtectedRoute element={element} onlyUnAuth={true} />
    )
}