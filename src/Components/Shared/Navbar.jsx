import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "./../../assets/logoT.png"
import './Navbar.css'
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import UseAuthContext from "../../Hooks/UseAuthContext";
import Swal from "sweetalert2";
import { RxCross1 } from "react-icons/rx";
import UseUser from "../../Hooks/UseUser";
import SectionComponent from "../SectionComponent/SectionComponent";

const Navbar = () => {
    const { user, logOut } = UseAuthContext();
    const [showNav, setShowNav] = useState(false);
    const [data, , isLoading] = UseUser()
    const location = useLocation();
    const userName = data?.donarName?.split('')[0];
    const dashboard = location.pathname.includes('dashboard');
    const status = JSON.parse(localStorage.getItem('profileUpdateStatus'))
    const handleLogOut = () => {


        logOut()
            .then(() => {
                // console.log(result);
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
            <NavLink to='/' className={`${location.pathname === '/' ? 'border-b-4 border-red-600 hover:text-black text-red-700 hover:bg-transparent' : ''} px-5   font-bold uppercase hover:bg-blue-100 py-3 transition-all rounded-md`}>Home</NavLink>

            <NavLink to='/all-blood-donation-request' className={`${location.pathname === '/all-blood-donation-request' ? 'border-b-4 border-red-600 hover:text-black text-red-700 hover:bg-transparent' : ''} px-5   font-bold uppercase hover:bg-blue-100 py-3 transition-all rounded-md`}> donation&nbsp;req&apos;s</NavLink>

            {
                user ? <NavLink to='/dashboard/profile' className={`${dashboard ? 'border-b-4 border-red-600 hover:text-black text-red-700 hover:bg-transparent' : ''} px-5   font-bold uppercase hover:bg-blue-100 py-3 transition-all rounded-md`}>dashboard</NavLink> : null
            }

            {
                user && <NavLink to={'/funding'} className={`${location.pathname === '/funding' ? 'border-b-4 border-red-600 hover:text-black text-red-700 hover:bg-transparent' : ''} px-5   font-bold uppercase hover:bg-blue-100 py-3 transition-all rounded-md`}>funding</NavLink>
            }
            <NavLink to='/blogs' className={`${location.pathname === '/blogs' ? 'border-b-4 border-red-600 hover:text-black text-red-700 hover:bg-transparent' : ''} px-5   font-bold uppercase hover:bg-blue-100 py-3 transition-all rounded-md`}>blogs</NavLink>

            <div className="flex relative items-center">
                {user ?
                    isLoading ? <span className="loading loading-spinner loading-lg"></span> :
                        data?.donarImage ?
                            <div>
                                <div className="w-14 lg:block hidden relative h-14 rounded-full bg-red-600 text-white">
                                    <img className="rounded-full object-cover w-full h-full" src={data?.donarImage} alt="" />
                                    <span className={`w-[20px] absolute top-0 right-0 rounded-full h-[20px] ${data?.status == 'active' ? 'bg-green-500 border-white border-2' : data?.status == 'blocked' ? 'bg-red-500 border-white border-2' : 'bg-gray-300'}`}></span>
                                </div>
                            </div> :
                            <div className="w-14 relative h-14 rounded-full bg-red-600 text-white">
                                <span className="flex items-center justify-center font-semibold text-4xl" >{userName}</span>
                                <span className={`w-[20px] absolute top-0 right-0 rounded-full h-[20px] ${data?.status == 'active' ? 'bg-green-500' : data?.status == 'blocked' ? 'bg-red-500' : 'bg-gray-300'}`}></span>
                            </div> :
                    <NavLink to='/login' className=" rounded-md bg-red-700 text-white font-bold uppercase py-2  transition-all  hover:bg-red-900 border-2 px-10">join</NavLink>}

                {
                    user ? <select onChange={handleLogOut} className="absolute lg:block hidden w-[100px] cursor-pointer h-full bg-transparent  bottom-0 -right-4" name="" id="">
                        <option className="" value=""></option>
                        <option className=" rounded-md w-full bg-red-700 text-white font-bold uppercase py-2  transition-all  hover:bg-red-900 border-2 px-10" value=""> logout</option>
                    </select> : null
                }
                {
                    user && <button onClick={handleLogOut} className="lg:hidden rounded-md w-full bg-red-700 text-white font-bold uppercase py-2  transition-all  hover:bg-red-900 border-2 px-10" value=""> logout</button>
                }
            </div>
        </ul>

    // 



    return (
        <div className={`sticky ${user && (!user?.emailVerified || status != 100) ? 'z-30' : 'z-50'} left-0 top-0 bg-white`}
            style={{ opacity: .1, transform: 'translateY(-90%)', transition: '1s', transitionDelay: '.2s' }} id="navSection"

        >
            <div className="max-w-7xl mx-auto ">
                <div className="flex  sm:flex-row items-center justify-around lg:justify-between">
                    <div className="lg:flex-1">
                        <Link to={'/'}> <img className="md:w-[200px] md:h-[100px] w-[150px] h-[70px] object-fill" src={logo} alt="" /></Link>
                    </div>
                    {user ?
                        <div>
                            <Link to={'/dashboard/profile'}>
                                <div className="w-14 lg:hidden block relative h-14 rounded-full bg-red-600 text-white">
                                    <img className="rounded-full object-cover w-full h-full" src={data?.donarImage} alt="" />
                                    <span className={`w-[20px] absolute top-0 right-0 rounded-full h-[20px] ${data?.status == 'active' ? 'bg-green-500 border-white border-2' : data?.status == 'blocked' ? 'bg-red-500 border-white border-2' : 'bg-gray-300'}`}></span>
                                </div></Link>
                        </div> : null
                    }
                    <div className="lgSizeDevice lg:block hidden">
                        {navContent}
                    </div>
                    <div onClick={() => setShowNav(!showNav)} className="cursor-pointer btn lg:hidden bg-red-700 text-white">{showNav ? <RxCross1></RxCross1> : <IoMenu ></IoMenu>}</div>
                </div>

            </div>
            <div onClick={() => setShowNav(!showNav)} className={`SmallSizeDevice lg:hidden ${showNav ? 'block' : 'hidden'} transition-all   max-w-7xl relative mx-auto`}>
                {navContent}

            </div>
            <hr />
            <SectionComponent id={'navSection'} from={'translateY'}></SectionComponent>

        </div>
    );
};

export default Navbar;