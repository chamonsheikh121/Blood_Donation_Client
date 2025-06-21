import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../../Pages/HomePage/Footer";



const RootLayout = () => {
    // const [userData] = UseUser();
    // const { user } = UseAuthContext()
    // let status = JSON.parse(localStorage.getItem('profileUpdateStatus'))
    // if (!status) {
    //     status = 0;
    // }
    // if (userData) {
    //     if (status == 90 && userData?.profileUpdateStatus == 100) {
    //         Swal.fire({
    //             title: "Profile updated 100 % ",
    //             icon: "success",
    //         });
    //     }
    //     status = userData?.profileUpdateStatus
    //     localStorage.setItem('profileUpdateStatus', JSON.stringify(status))
    // }

    // console.log(userData?.profileUpdateStatus);
    return (
        <div>
         

            <Navbar></Navbar>

            <Outlet></Outlet>
          <div className="mt-20">
              <Footer></Footer>
          </div>
        </div>
    );
};

export default RootLayout;