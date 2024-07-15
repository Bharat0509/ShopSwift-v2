import { useLogoutQuery } from "@/redux/features/authApiSlice";
import { logOut } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useLogoutQuery({});
    dispatch(logOut());
    navigate("/", { replace: true });
    return null;
};

export default LogOut;
