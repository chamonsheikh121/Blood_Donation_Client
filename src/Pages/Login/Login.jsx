import { Link,  } from "react-router-dom";
import img from '../../assets/pexels-olenkabohovyk-3646172.jpg'


import { Helmet } from "react-helmet";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useState } from "react";
import GoogleSIgnIn from "../../Utils/GoogleSIgnIn";

const Login = () => {
    // const { signInEmailPass } = UseAuthContext();
    const [toggle, setToggle] = useState(false)
    // const [loading, setLoading] = useState(false)
    // const location = useLocation();
    // console.log(location);
    // const navigate = useNavigate();
    // const handleLoginSubmit = (e) => {
    //     e.preventDefault();
    //     setLoading(true)
    //     const form = new FormData(e.currentTarget);
    //     const email = form.get('userEmail');
    //     const password = form.get('userPassword');
    //     console.log(email, password);

    //     signInEmailPass(email, password)
    //         .then(() => {
    //             const status = 0;
    //             localStorage.setItem('profileUpdateStatus', JSON.stringify(status))
    //             Swal.fire({
    //                 title: "Logged in successfully",
    //                 icon: 'success',
    //                 timer: 1000,
    //             });
    //             setLoading(false)
    //             navigate(location?.state ? location.state : '/dashboard/profile')
    //         })
    //         .catch(err => {
    //             Swal.fire(`${err.message}`);
    //             setLoading(false)
    //         });

    // }
    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col  lg:flex-row md:gap-20">
                    <div className="text-center lg:text-left">
                        <img className="w-[500px] rounded-md" src={img}  alt="" />
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body hidden">
                            <span>Email : </span>
                            <div className="form-control">

                                <input type="email" placeholder="email" name='userEmail' className="input focus:outline-none focus:border-black input-bordered" required />
                            </div>
                            <span>Password :</span>
                            <div className="form-control relative">
                                <div onClick={() => setToggle(!toggle)} className='absolute top-3 right-5 cursor-pointer rounded-full'>
                                    {toggle ? <BsEyeFill size={25}></BsEyeFill> : <BsEyeSlashFill size={25}></BsEyeSlashFill>}
                                </div>
                                <input type={toggle ? 'text' : 'password'} placeholder="password" name='userPassword' className="input focus:outline-none focus:border-black input-bordered" required />
                            </div>
                            <div className="flex text-sm lg:text-[16px] justify-between w-full">
                                <p className="flex items-center gap-2"> <input type="checkbox" className="checkbox checkbox-sm" /><span>remember me</span></p>
                                <Link to={'/login/reset-password'}><p className="text-end hover:underline underline-offset-4">forgot password ? </p></Link>
                            </div>
                            <button className="btn mt-5 hover:bg-green-700 bg-green-600 text-white">Login now</button>
                            <p className='text-sm text-center text-gray-600'>New here ? <Link className='text-green-700 underline-offset-4 underline' to='/registration'>create account</Link></p>
                        </form>
                        <hr className="mb-2" />
                      <GoogleSIgnIn></GoogleSIgnIn>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;