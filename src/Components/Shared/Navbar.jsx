import { NavLink, useLocation } from "react-router-dom";
import logo from "./../../assets/Screenshot_1.png"
import './Navbar.css'
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import UseAuthContext from "../../Hooks/UseAuthContext";
import Swal from "sweetalert2";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
    const { user, logOut } = UseAuthContext();
    const [showNav, setShowNav] = useState(false);
    const location = useLocation();
    console.log(location.pathname);


    const handleLogOut = () => {


        logOut()
            .then((result) => {
                console.log(result);
                Swal.fire({
                    title: "logged out successfully",
                    icon: 'success',
                    timer: 1000,
                });
            })
            .catch(error => console.log(error))
    }


    //  
    const navContent =
        <ul>
            <NavLink to='/' className={`${location.pathname === '/' ? 'border-b-4 border-red-600 hover:text-black text-red-700 hover:bg-transparent' : ''} px-5   font-bold uppercase hover:bg-red-200 py-3 transition-all rounded-md`}>Home</NavLink>

            <NavLink to='/all-blood-donation-request' className={`${location.pathname === '/all-blood-donation-request' ? 'border-b-4 border-red-600 hover:text-black text-red-700 hover:bg-transparent' : ''} px-5   font-bold uppercase hover:bg-red-200 py-3 transition-all rounded-md`}> donation&nbsp;req</NavLink>

            <NavLink to='/dashboard/profile' className={`${location.pathname === '/dashboard' ? 'border-b-4 border-red-600 hover:text-black text-red-700 hover:bg-transparent' : ''} px-5   font-bold uppercase hover:bg-red-200 py-3 transition-all rounded-md`}>dashboard</NavLink>

            <NavLink className={`${location.pathname === '/funding' ? 'border-b-4 border-red-600 hover:text-black text-red-700 hover:bg-transparent' : ''} px-5   font-bold uppercase hover:bg-red-200 py-3 transition-all rounded-md`}>funding</NavLink>
            <NavLink to='/blogs' className={`${location.pathname === '/blogs' ? 'border-b-4 border-red-600 hover:text-black text-red-700 hover:bg-transparent' : ''} px-5   font-bold uppercase hover:bg-red-200 py-3 transition-all rounded-md`}>blogs</NavLink>

            {user ? <button onClick={handleLogOut} className=" rounded-md bg-red-700 text-white font-bold uppercase py-2  transition-all  hover:bg-red-900 border-2 px-10">logout</button> : <NavLink to='/login' className=" rounded-md bg-red-700 text-white font-bold uppercase py-2  transition-all  hover:bg-red-900 border-2 px-10">login</NavLink>}
        </ul>



    return (
        <div className="sticky left-0 top-0 bg-white">
            <div className="max-w-7xl mx-auto ">
                <div className="flex  sm:flex-row items-center justify-around lg:justify-between">
                    <div className="lg:flex-1">
                        <img className="w-3/4 sm:w-auto" src={logo} alt="" />
                    </div>
                    <div className="lgSizeDevice lg:block hidden">
                        {navContent}
                    </div>
                    <div onClick={() => setShowNav(!showNav)} className="cursor-pointer btn lg:hidden bg-red-700 text-white">{showNav ? <RxCross1></RxCross1>  : <IoMenu ></IoMenu>}</div>
                </div>

            </div>
            <div onClick={() => setShowNav(!showNav)} className={`SmallSizeDevice lg:hidden ${showNav ? 'block' : 'hidden'} transition-all   max-w-7xl relative mx-auto`}>
                {navContent}
            </div>
            <hr />
        </div>
    );
};

export default Navbar;