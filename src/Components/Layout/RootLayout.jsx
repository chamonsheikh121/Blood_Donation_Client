import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import ProfileUpdateMessage from "../Shared/ProfileUpdateMessage";
import UseUser from "../../Hooks/UseUser";
import Swal from "sweetalert2";
import UseAuthContext from "../../Hooks/UseAuthContext";


const RootLayout = () => {
    const [userData] = UseUser();
    const { user } = UseAuthContext()
    let status = JSON.parse(localStorage.getItem('profileUpdateStatus'))
    if (!status) {
        status = 0;
    }
    if (userData) {
        if (status == 90 && userData?.profileUpdateStatus == 100) {
            Swal.fire({
                title: "Profile updated 100 % ",
                icon: "success",
            });
        }
        status = userData?.profileUpdateStatus
        localStorage.setItem('profileUpdateStatus', JSON.stringify(status))
    }

    console.log(userData?.profileUpdateStatus);
    return (
        <div>
            {
                user && (!user?.emailVerified || status != 100) && <ProfileUpdateMessage status={status} data={userData}></ProfileUpdateMessage>
            }

            <Navbar></Navbar>

            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;