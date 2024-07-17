import { Navigate, Outlet } from "react-router-dom";
import { DashboardLayout } from "../Layout/DashboardLayout";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { selectAuthObject } from "@/redux/features/authSlice";
const DashboardOutlet = () => {
    const { status, user } = useAppSelector(selectAuthObject);
    
    useEffect(() => {}, [status, user]);
    if (status == "loading") return null;
    return status=="authenticated" ? (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    ) : (
        <Navigate to='/auth' />
       
    );
};
export default DashboardOutlet;
