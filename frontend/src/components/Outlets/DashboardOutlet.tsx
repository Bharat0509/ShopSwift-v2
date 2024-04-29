import { Navigate, Outlet } from "react-router-dom";
import { DashboardLayout } from "../Layout/DashboardLayout";
const DashboardOutlet = () => {
    const auth = true;
    return auth ? (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    ) : (
        <Navigate to='/auth' />
    );
};
export default DashboardOutlet;
