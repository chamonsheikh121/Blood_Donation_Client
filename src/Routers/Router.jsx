// import { Root } from "postcss";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import RootLayout from "../Components/Layout/RootLayout";
import AllDonationReq from "../Pages/AllDonationReq/AllDonationReq";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import Blogs from "../Pages/Blog/Blogs";
import DashboardLayout from "../Pages/UserDashboard/ProfilePage/DashboardLayout/DashboardLayout";
import Profile from "../Pages/UserDashboard/ProfilePage/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <HomePage></HomePage>
            },
            {
                path: 'all-blood-donation-request',
                element: <AllDonationReq></AllDonationReq>
            },
            {
                path:'blogs',
                element:<Blogs></Blogs>
            },
            {
                path:'dashboard',
                element: <DashboardLayout></DashboardLayout>,
                children:[
                    {
                        path:'profile',
                        element:<Profile></Profile>
                    }
                ]
            }
        ]
    },
    {
        path: '/registration',
        element: <Registration></Registration>
    },
    {
        path: '/login',
        element: <Login></Login>
    }
])

export default router;