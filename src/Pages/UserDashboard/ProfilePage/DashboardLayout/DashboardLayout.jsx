import { FaArrowRight, FaHome, FaUserNurse, FaUsers } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { RiFileEditFill, RiFolderAddFill, RiMessage2Fill } from "react-icons/ri";
import './DashboardLayout.css'
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsEnvelopeCheckFill } from "react-icons/bs";
import useAccepterDetails from "../../../../Hooks/UseAccepterDetails";
import UseUser from "../../../../Hooks/UseUser";
import { MdModeEdit } from "react-icons/md";




const DashboardLayout = () => {
    const [layoutNav, setLayoutNav] = useState(false);
    const [accepterData] = useAccepterDetails();
    const [acceptedDataCount, setAcceptedDataCount] = useState()
    const [userData] = UseUser()
    const location = useLocation();

    const adminNav = <div className="mt-4 space-y-4 border-t-2 border-green-700 pt-4 ">

        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/admin/manage-users' ? 'border-b-2' : ''} rounded-md  ${userData?.userRole == 'admin' ? 'hover:bg-green-900' : userData?.userRole == 'volunteer' ? 'hover:bg-yellow-900' : 'hover:bg-red-900'} list-none shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/admin/manage-users' className={` flex items-center gap-4  uppercase`}><FaUsers size={25}></FaUsers>manage users</NavLink>
        </li>
        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/admin/manage-volunteers' ? 'border-b-2' : ''} rounded-md  ${userData?.userRole == 'admin' ? 'hover:bg-green-900' : userData?.userRole == 'volunteer' ? 'hover:bg-yellow-900' : 'hover:bg-red-900'} list-none shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/admin/manage-volunteers' className={` flex items-center gap-4  uppercase`}><FaUserNurse size={25}></FaUserNurse>manage volunteers</NavLink>
        </li>
        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/manage-requests' ? 'border-b-2' : ''} rounded-md  ${userData?.userRole == 'admin' ? 'hover:bg-green-900' : userData?.userRole == 'volunteer' ? 'hover:bg-yellow-900' : 'hover:bg-red-900'} list-none shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/manage-requests' className={` flex items-center gap-4  uppercase`}><MdModeEdit size={25}></MdModeEdit>manage requests</NavLink>
        </li>
    </div>

    const volunteerNav = 

    <div className="mt-4 space-y-4 border-t-2 pt-4  border-yellow-700">
        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/manage-requests' ? 'border-b-2' : ''} rounded-md  ${userData?.userRole == 'admin' ? 'hover:bg-green-900' : userData?.userRole == 'volunteer' ? 'hover:bg-yellow-900' : 'hover:bg-red-900'} list-none shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/manage-requests' className={` flex items-center gap-4  uppercase`}><MdModeEdit size={25}></MdModeEdit>manage requests</NavLink>
        </li>
        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/send-message' ? 'border-b-2' : ''} rounded-md  ${userData?.userRole == 'admin' ? 'hover:bg-green-900' : userData?.userRole == 'volunteer' ? 'hover:bg-yellow-900' : 'hover:bg-red-900'} list-none shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/send-message' className={` flex items-center gap-4  uppercase`}><RiMessage2Fill size={25}></RiMessage2Fill>send message</NavLink>
        </li>

        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/create-blog' ? 'border-b-2' : ''} rounded-md  ${userData?.userRole == 'admin' ? 'hover:bg-green-900' : userData?.userRole == 'volunteer' ? 'hover:bg-yellow-900' : 'hover:bg-red-900'} list-none shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/create-blog' className={` flex items-center gap-4  uppercase`}><RiFileEditFill size={25}></RiFileEditFill>create blog</NavLink>
        </li>
        
        
    </div>

    const userNav = <ul className="w-full space-y-5 p-1">
        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/profile' ? 'border-b-2' : ''}  rounded-md  ${userData?.userRole == 'admin' ? 'hover:bg-green-900' : userData?.userRole == 'volunteer' ? 'hover:bg-yellow-900' : 'hover:bg-red-900'} shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/profile' className={` flex items-center gap-4  uppercase`}><FaHome size={25}></FaHome>profile</NavLink>
        </li>

        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/my-donation-requests' ? 'border-b-2' : ''}  relative rounded-md  ${userData?.userRole == 'admin' ? 'hover:bg-green-900' : userData?.userRole == 'volunteer' ? 'hover:bg-yellow-900' : 'hover:bg-red-900'} shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/my-donation-requests' className={` flex items-center gap-4  uppercase`}><GiNotebook size={25}></GiNotebook>my requests</NavLink>
            <div className="absolute cursor-pointer  bg-black text-white rounded-full
            p-[1px] w-[20px] h-[20px] flex items-center justify-center  -top-5 text-sm  left-3 tooltip tooltip-close tooltip-right" data-tip="not full filled">
                <span className="">{acceptedDataCount}</span>
            </div>

        </li>
        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/my-acceptations' ? 'border-b-2' : ''} rounded-md  ${userData?.userRole == 'admin' ? 'hover:bg-green-900' : userData?.userRole == 'volunteer' ? 'hover:bg-yellow-900' : 'hover:bg-red-900'} shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/my-acceptations' className={` flex items-center gap-4  uppercase`}><BsEnvelopeCheckFill size={25}></BsEnvelopeCheckFill>my Acceptation</NavLink>
        </li>
        <li onClick={() => setLayoutNav(false)} className={`${location.pathname === '/dashboard/create-donation-request' ? 'border-b-2' : ''} rounded-md  ${userData?.userRole == 'admin' ? 'hover:bg-green-900' : userData?.userRole == 'volunteer' ? 'hover:bg-yellow-900' : 'hover:bg-red-900'} shadow-md py-2 pl-5 font-semibold space-y-5`}>
            <NavLink to='/dashboard/create-donation-request' className={`  flex items-center gap-4  uppercase`}><RiFolderAddFill size={25}></RiFolderAddFill>create request</NavLink>
        </li>

    </ul>
    useEffect(() => {
        if (accepterData) {
            // console.log('chamon');
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
                {userNav}
            </div>
            <div className="grid grid-cols-12">
                <div className={`lg:col-span-2 hidden lg:block text-gray-200  ${userData?.userRole == 'admin' ? 'bg-green-800' : userData?.userRole == 'volunteer' ? 'bg-yellow-800' : 'bg-red-800'} md:h-[650px] sticky top-[81px]`}>
                    <div>
                        {
                            userData?.userRole == 'user' && <h2 className="text-2xl text-center mt-5 font-bold">Donar & Requester</h2>
                        }
                        {
                            userData?.userRole == 'volunteer' && <h2 className="text-2xl text-center mt-5 font-bold">Volunteer</h2>
                        }
                        {
                            userData?.userRole == 'admin' && <h2 className="text-2xl text-center mt-5 font-bold">Admin</h2>
                        }
                    </div>
                    <div className="w-full mt-10">

                        {userNav}
                        {
                            userData?.userRole == 'admin' && adminNav
                        }
                        {
                            userData?.userRole == 'volunteer' && volunteerNav
                        }

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