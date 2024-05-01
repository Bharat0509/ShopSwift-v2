import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        // dispatch(logOutUser());
        navigate("/", { replace: true });
    }, [dispatch, navigate]);
    return <div className=''>Logging Out...</div>;
};

export default LogOut;
