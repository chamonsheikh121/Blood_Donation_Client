// import { Root } from "postcss";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";

import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import RootLayout from "../Components/Layout/RootLayout";

import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Profile from '../Pages/ProfilePage/Profile'
import AboutUs from "../AboutUsPage/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import ExploreBooks from "../Pages/ExploreBooks/ExploreBooks";
import BookDetails from "../BookDetails/BookDetails";
import AdminLayout from "../Pages/admin/adminLayout/adminLayout";
import BookManagement from "../Pages/admin/adminLayout/BookManagement/BookManagement";
import UserManagement from "../Pages/admin/ManageUsers/ManageUser";
import BorrowReturn from "../Pages/admin/BorrowReturn/BorrowReturn";
import FinesPayments from "../Pages/admin/FinePayments/FinePayments";
import { Settings } from "lucide-react";



const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <HomePage></HomePage>
            },
            {
                path: '/profile',
                element: <Profile></Profile>
            },
            {
                path: '/about-us',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/contact-us',
                element: <ContactUs></ContactUs>
            },
            {
                path: '/all-books',
                element: <ExploreBooks></ExploreBooks>
            },
            {
                path:'/book/:id',
                element: <BookDetails></BookDetails>
            },
            {
                path:'/admin',
                element: <AdminLayout></AdminLayout>,
                children:[
                    {
                        index:true,
                        element: <BookManagement></BookManagement>
                    },
                    {
                        path:'users',
                        element: <UserManagement></UserManagement>
                    },
                    {
                        path:'borrows',
                        element: <BorrowReturn></BorrowReturn>
                    },
                    {
                        path:'fines',
                        element: <FinesPayments></FinesPayments>
                    },
                    {
                        path:'settings',
                        element: <Settings></Settings>
                    },
                ]
            },
        ]
    },
    {
        path: '/registration',
        element: <Registration></Registration>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/login/reset-password',
        element: <ResetPassword></ResetPassword>
    }
])

export default router;