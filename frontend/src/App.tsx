import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Authentication from "./components/Authentication";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AuthenticatedOutlet from "./components/Outlets/AuthOutlet";
import DashboardOutlet from "./components/Outlets/DashboardOutlet";
import Profile from "./components/Profile";
import { Dashboard } from "./components/Dashboard";
import ProductsDashboard from "./components/Dashboard/Products";
import { AddProduct } from "./components/Dashboard/Products/Add";
import { Shop } from "./components/Shop";
import LogOut from "./components/LogOut";
import ProductInfo from "./components/ProductDetail";
import { ForgotPassword } from "./components/Authentication/ForgotPassword";
import { ResetPassword } from "./components/Authentication/ResetPassword";
import PlaceOrder from "./components/Cart/PlaceOrder";
import WrapperScrollToTop from "./components/ui/scrollToTop";
import ProcessPayment from "./components/Cart/ProcessPayment";
import ProcessPaymentSuccess from "./components/Cart/ProcessPaymentSuccess";
import { UpdateProduct } from "./components/Dashboard/Products/Edit";
import MyOrder from "./components/MyOrders/MyOrder";
import MyOrders from "./components/MyOrders";
import DashboardOrders from "./components/Dashboard/Orders";
import DashboardOrder from "./components/Dashboard/Orders/Order";

function App() {
    return (
        <main>
            <Router>
                <WrapperScrollToTop>
                    <Navbar />
                </WrapperScrollToTop>
                <Routes>
                    <Route path='/' index element={<Home />} />
                    <Route path='/auth' element={<Authentication />} />
                    <Route
                        path='/forgot-password'
                        element={<ForgotPassword />}
                    />
                    <Route path='/reset-password' element={<ResetPassword />} />
                    <Route path='/logOut' element={<LogOut />} />
                    <Route path='/products' element={<Shop />} />
                    <Route
                        path='/products/:productId'
                        element={<ProductInfo />}
                    />

                    <Route path='/account' element={<AuthenticatedOutlet />}>
                        <Route index element={<Profile />} />
                        <Route path='cart' element={<Cart />} />
                        <Route path='place-order' element={<PlaceOrder />} />
                        <Route
                            path='process-payment'
                            element={<ProcessPayment />}
                        />
                        <Route
                            path='process-payment/success'
                            element={<ProcessPaymentSuccess />}
                        />
                        <Route path='orders' element={<MyOrders />} />
                        <Route path='orders/:orderId' element={<MyOrder />} />
                    </Route>
                    <Route path='/dashboard' element={<DashboardOutlet />}>
                        <Route index element={<Dashboard />} />
                        <Route
                            path='products'
                            element={<ProductsDashboard />}
                        />
                        <Route path='products/add' element={<AddProduct />} />
                        <Route path='products/:id/edit' element={<UpdateProduct />} />
                        <Route path='orders' element={< DashboardOrders/>} />
                        <Route path='orders/:orderId' element={<DashboardOrder />} />
                    </Route>
                </Routes>
            </Router>
            <Toaster />
        </main>
    );
}

export default App;
