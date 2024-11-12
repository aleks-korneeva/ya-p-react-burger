import { useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

export const ProtectedRoute = ({element}) => {
    const { user } = useSelector(state => state.auth);

    const location = useLocation();

    return user ? element : <Navigate to={"/login"} replace state={{from: location}}/>
}