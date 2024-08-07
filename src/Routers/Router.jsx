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
import MyDonationRequest from "../Pages/UserDashboard/MyDonationRequest/MyDonationRequest";
import CreateDonationRequest from "../Pages/UserDashboard/CreateDonationRequest/CreateDonationRequest";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyRequestDetails from "../Pages/UserDashboard/MyRequestDetails/MyRequestDetails";
import EditRequest from "../Pages/UserDashboard/EditRequest/EditRequest";
import MyAcceptation from "../Pages/UserDashboard/MyAcceptation/MyAcceptation";
import SearchDonar from "../Pages/SearchDonar/SearchDonar";
import SearchRequest from "../Pages/SearchRequest/SearchRequest";

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
                path: 'all-blood-donation-request/:id',
                element: <MyRequestDetails></MyRequestDetails>
            },
            {
                path: 'search-donar',
                element: <SearchDonar></SearchDonar>
            },
            {
                path: 'search-request',
                element: <SearchRequest></SearchRequest>,
                children:[
                    {
                        path:':id',
                        element:<MyRequestDetails></MyRequestDetails>
                    }
                ]
            },
            {
                path: 'blogs',
                element: <Blogs></Blogs>
            },
            {
                path: 'dashboard',
                element: <PrivateRoute>
                    <DashboardLayout></DashboardLayout>
                </PrivateRoute>,
                children: [
                    {
                        path: 'profile',
                        element: <PrivateRoute><Profile></Profile></PrivateRoute>
                    },
                    {
                        path: 'my-donation-requests',
                        element: <MyDonationRequest></MyDonationRequest>
                    },
                    {
                        path: 'my-donation-requests/:id',
                        element: <MyRequestDetails></MyRequestDetails>
                    },
                    {
                        path: 'my-acceptations',
                        element: <MyAcceptation></MyAcceptation>
                    },
                    {
                        path: 'my-donation-requests/:id/edit',
                        element: <EditRequest></EditRequest>

                    },
                    {
                        path: 'create-donation-request',
                        element: <CreateDonationRequest></CreateDonationRequest>
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