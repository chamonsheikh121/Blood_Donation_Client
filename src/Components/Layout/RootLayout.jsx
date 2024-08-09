import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import ProfileUpdateMessage from "../Shared/ProfileUpdateMessage";
import UseUser from "../../Hooks/UseUser";
import Swal from "sweetalert2";


const RootLayout = () => {
    const [userData] = UseUser();
    let status = JSON.parse(localStorage.getItem('profileUpdateStatus'))
    if (userData?.profileUpdateStatus) {
        if (status == 90 && userData?.profileUpdateStatus == 100){
            Swal.fire({
                title: "Profile updated 100 % ",
                icon: "success",
              });
        }
            status = userData?.profileUpdateStatus
        localStorage.setItem('profileUpdateStatus', JSON.stringify(status))
    }


    return (
        <div>
            {
                status != 100 && <ProfileUpdateMessage status={status} data={userData}></ProfileUpdateMessage>
            }

            <Navbar></Navbar>

            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;