import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Theme from "./scenes/Themes/Theme";
import Public from './scenes/routes/Public'
import Private from './scenes/routes/Private'
import AdminLogin from './components/admin/AdminLogin'
import AdminPackages from "./scenes/admin/adminPackages/AdminPackages";
import Home from "./Home";
import ContactUs from "./scenes/pages/ContactUs";
import AboutUs from "./scenes/pages/AboutUs";
import AdminTheme from "./scenes/admin/adminTheme/AdminTheme";
import EditTheme from "./scenes/admin/adminTheme/EditTheme/EditTheme";
import AdminUsers from "./scenes/admin/adminUsers/AdminUsers";
import AdminAddUsers from "./scenes/admin/adminUsers/AddUsers/AdminAddUsers";
import AdminEditUsers from "./scenes/admin/adminUsers/EditUsers/AdminEditUsers";
import jwtDecode from "jwt-decode";
import Package from "./scenes/package/Package";
import AdminAddPackage from "./scenes/admin/adminPackages/AddPackages/AdminAddPackage";
import CreateTheme from "./scenes/admin/adminTheme/AddTheme/CreateTheme";
import AdminEditPackage from "./scenes/admin/adminPackages/EditPackages/AdminEditPackage";
import SubTheme from "./scenes/Themes/SubTheme";
import City from "./scenes/city/City";
import LikePackages from "./scenes/liked/LikePackages";
import UserPrivateRoute from "./scenes/routes/UserPrivateRoute";
import Booking from "./scenes/booking/Booking";
import MyBookings from "./scenes/mybookings/MyBookings";
import { useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import AdminBookings from "./scenes/admin/adminBookings/AdminBookings";

const App = () => {

    useEffect(() => {
        if (localStorage.getItem("admin-token")) {
            const token = localStorage.getItem("admin-token");
            const decodeToken = jwtDecode(token);
            console.log(decodeToken);
        }
        if (localStorage.getItem("login-token")) {
            const token = localStorage.getItem("login-token");
            const decodeToken = jwtDecode(token);
            console.log(decodeToken);
        }
    }, [])

    const { success } = useSelector(state => state.globalReducer);

    useEffect(() => {
        if (success) {
            const toastId = toast.success(success, {
                style: {
                    backgroundColor: "#393a3b",
                    color: "white",
                    padding: "8px",
                },
            });

            setTimeout(() => {
                toast.dismiss(toastId);
            }, 3000);
        }
    }, [success]);

    return (
        <>
            {success && (
                <Toaster
                    toastOptions={{ style: { fontSize: "1.5rem" } }}
                    position="top-center"
                    reverseOrder={true}
                />
            )}
            <BrowserRouter>
                <Routes>
                    <Route path="auth">
                        <Route path="admin-login" element={<Public><AdminLogin /></Public>} />
                    </Route>
                    <Route path="dashboard">
                        <Route path="users" element={<Private><AdminUsers /></Private>} ></Route>
                        <Route path="add-users" element={<Private><AdminAddUsers /></Private>} ></Route>
                        <Route path="updateuser/:id" element={<Private><AdminEditUsers /></Private>} ></Route>
                        <Route path="packages" element={<Private><AdminPackages /></Private>} />
                        <Route path="add-package" element={<Private><AdminAddPackage /></Private>} />
                        <Route path="update-package/:id" element={<Private><AdminEditPackage /></Private>} ></Route>
                        <Route path="theme" element={<Private><AdminTheme /></Private>} />
                        <Route path="create-theme" element={<Private><CreateTheme /></Private>} />
                        <Route path="update/:id" element={<Private><EditTheme /></Private>} ></Route>
                        <Route path="bookings" element={<Private><AdminBookings /></Private>} />
                        <Route path="payments" element={<Private><AdminTheme /></Private>} />
                        <Route path="*" element={<Private><AdminAddUsers /></Private>} />
                    </Route>
                    <Route path="/" element={<Home />} />
                    <Route path="/theme" element={<Theme />} />
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/theme/:id" element={<SubTheme />} />
                    <Route path="/city/:name" element={<City />} />
                    <Route path="/package/:id" element={<Package />} />
                    <Route path="/liked" element={<UserPrivateRoute><LikePackages /></UserPrivateRoute>} />
                    <Route path="/booking/:id" element={<UserPrivateRoute><Booking /></UserPrivateRoute>} />
                    <Route path="/mybookings" element={<UserPrivateRoute><MyBookings /></UserPrivateRoute>} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
const AppComponent = styled.div`
  position: relative;
`;
