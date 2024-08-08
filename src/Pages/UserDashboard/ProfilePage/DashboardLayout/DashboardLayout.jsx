import { FaArrowRight, FaHome } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { RiFolderAddFill } from "react-icons/ri";
import './DashboardLayout.css'
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsEnvelopeCheckFill } from "react-icons/bs";
import useAccepterDetails from "../../../../Hooks/UseAccepterDetails";



const DashboardLayout = () => {
    const [layoutNav, setLayoutNav] = useState(false);
    const [accepterData] = useAccepterDetails();
    console.log(accepterData);
    const [acceptedDataCount, setAcceptedDataCount] = useState()


    const location = useLocation();





    const dashboardNav = <ul className="w-full space-y-5 p-1">
        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/profile' ? 'border-b-2' : ''}  rounded-md hover:bg-red-800 shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/profile' className={` flex items-center gap-4  uppercase`}><FaHome size={25}></FaHome>profile</NavLink>
        </li>
        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/my-donation-requests' ? 'border-b-2' : ''}  relative rounded-md hover:bg-red-800 shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/my-donation-requests' className={` flex items-center gap-4  uppercase`}><GiNotebook size={25}></GiNotebook>my requests</NavLink>
            <div className="absolute cursor-pointer  bg-red-900 text-white rounded-full
            p-[1px] w-[20px] h-[20px] flex items-center justify-center  -top-5 text-sm  left-3 tooltip tooltip-close tooltip-right" data-tip="not full filled">
                <span className="">{acceptedDataCount}</span>
            </div>

        </li>
        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/my-acceptations' ? 'border-b-2' : ''} rounded-md hover:bg-red-800 shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/my-acceptations' className={` flex items-center gap-4  uppercase`}><BsEnvelopeCheckFill size={25}></BsEnvelopeCheckFill>my Acceptation</NavLink>
        </li>
        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/create-donation-request' ? 'border-b-2' : ''} rounded-md hover:bg-red-800 shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/create-donation-request' className={`  flex items-center gap-4  uppercase`}><RiFolderAddFill size={25}></RiFolderAddFill>create request</NavLink>
        </li>

    </ul>
    useEffect(() => {
        if (accepterData) {
            console.log('chamon');
            const filter = accepterData?.filter(data => data?.status == 'notFullFilled');
            setAcceptedDataCount(filter?.length)
        }
    }, [accepterData])
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