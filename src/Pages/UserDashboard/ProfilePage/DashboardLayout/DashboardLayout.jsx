import { FaArrowRight, FaHome } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { RiFolderAddFill } from "react-icons/ri";
import './DashboardLayout.css'
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";



const DashboardLayout = () => {
    const [layoutNav, setLayoutNav] = useState(false);
    console.log(layoutNav);


    const location = useLocation();

    const dashboardNav = <ul className="w-full space-y-5 p-1">
        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/profile' ? 'border-b-2' : ''}  rounded-md hover:bg-red-800 shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/profile' className={` flex items-center gap-4  uppercase`}><FaHome size={25}></FaHome>profile</NavLink>
        </li>
        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/my-donation-requests' ? 'border-b-2' : ''} rounded-md hover:bg-red-800 shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/my-donation-requests' className={` ${location.pathname === '/dashboard/my-donation-requests' ? '' : ''} flex items-center gap-4  uppercase`}><GiNotebook size={25}></GiNotebook>my requests</NavLink>
        </li>
        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/create-donation-request' ? 'border-b-2' : ''} rounded-md hover:bg-red-800 shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/create-donation-request' className={` ${location.pathname === '/dashboard/create-donation-request' ? '' : ''} flex items-center gap-4  uppercase`}><RiFolderAddFill size={25}></RiFolderAddFill>create request</NavLink>
        </li>

    </ul>

    return (
        <div className="">
            <button onClick={() => setLayoutNav(true)} className={`fixed btn  ${layoutNav ? 'hidden' : ''} text-white bg-red-700
                 p-4 rounded-tr-md rounded-br-md`}><FaArrowRight ></FaArrowRight></button>
            <div className={`bg-red-700  ${layoutNav ? 'block' : 'hidden'} h-[650px]  absolute top-[80px] w-2/4 p-2   text-white`}>
                <div className="flex justify-end mr-5">

                    <span onClick={() => setLayoutNav(false)} className="w-[20px] border text-center">+</span>
                </div>
                {dashboardNav}
            </div>
            <div className="grid grid-cols-12">
                <div className="lg:col-span-2 hidden lg:block text-gray-200 bg-red-700 md:h-[650px] sticky top-[81px]">
                    <div className="w-full mt-10">
                        {dashboardNav}
                    </div>
                </div>
                <div className="lg:col-span-10 col-span-12 lg:p-2 p-5 pt-20 lg:pt-0 text-gray-800 bg-gray-200 ">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;