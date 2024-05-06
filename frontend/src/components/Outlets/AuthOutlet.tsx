import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AccountLayout } from "../Layout/UserLayout";
import { selectAuthObject } from "@/redux/features/authSlice";
const AuthenticatedOutlet = () => {
    const { status, user } = useAppSelector(selectAuthObject);
    const location = useLocation();

    useEffect(() => {}, [status, user]);
    return status === "authenticated" && user?.email ? (
        <AccountLayout>
            <Outlet />
        </AccountLayout>
    ) : (
        <Navigate
            to='/auth'
            replace={false}
            state={{ redirectUrl: location.pathname + location.search }}
        />
    );
};
export default AuthenticatedOutlet;
