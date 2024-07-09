import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";


const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;