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
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ManageUsers from "../Pages/UserDashboard/AdminDashboard/ManageUsers/ManageUsers";
import ManageVolunteers from "../Pages/UserDashboard/AdminDashboard/ManageVolunteers.jsx/ManageVolunteers";
import ManageRequests from "../Pages/UserDashboard/AdminDashboard/ManageRequests/ManageRequests";
import SendMessageToAdmin from "../Pages/UserDashboard/VolunteeerDashboard/SendMessageToAdmin";
import CreateBlogPage from "../Pages/UserDashboard/Create Blog/CreateBlogPage";
import PreviewBlog from "../Pages/UserDashboard/Create Blog/PreviewBlog";
import AddReview from "../Pages/UserDashboard/AddReview/AddReview";
import Funding from "../Pages/Funding/Funding";


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
                path: 'all-blood-donation-request',
                element: <AllDonationReq></AllDonationReq>
            },
            {
                path: 'edit/:id',
                element: <EditRequest></EditRequest>

            },
            {
                path: 'donation-requests/:id',
                element: <MyRequestDetails></MyRequestDetails>
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
                children: [
                    {
                        path: ':id',
                        element: <MyRequestDetails></MyRequestDetails>
                    }
                ]
            },
            {
                path: 'blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/funding',
                element: <Funding></Funding>
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
                    },
                    {
                        path: 'admin/manage-users',
                        element: <ManageUsers></ManageUsers>
                    },
                    {
                        path: 'admin/manage-volunteers',
                        element: <ManageVolunteers></ManageVolunteers>
                    },
                    {
                        path: 'manage-requests',
                        element: <ManageRequests></ManageRequests>
                    },
                    {
                        path: 'manage-requests',
                        element: <ManageRequests></ManageRequests>
                    },
                    {
                        path: 'add-review',
                        element: <AddReview></AddReview>
                    },
                    {
                        path: 'send-message',
                        element: <SendMessageToAdmin></SendMessageToAdmin>
                    },
                    {
                        path: 'create-blog',
                        element: <CreateBlogPage></CreateBlogPage>
                    },
                    {
                        path: 'create-blog/preview',
                        element: <PreviewBlog></PreviewBlog>
                    },
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
    },
    {
        path: '/login/reset-password',
        element: <ResetPassword></ResetPassword>
    }
])

export default router;