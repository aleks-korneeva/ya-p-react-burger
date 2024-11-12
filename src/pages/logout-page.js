import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {logout} from "../services/actions/auth";
import {useNavigate} from "react-router-dom";

export const LogoutPage = () => {
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
    }, []);

    useEffect(() => { //todo user
        if (!user) {
            console.log("navigate to login")
            navigate("/login");
        }
    }, [user])

    return (
        <div></div>
    )
}