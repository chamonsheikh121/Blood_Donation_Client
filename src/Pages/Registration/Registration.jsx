

import { Link, } from 'react-router-dom';


import img from '../../assets/pexels-polina-zimmerman-3747505.jpg'

import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import GoogleSIgnIn from '../../Utils/GoogleSIgnIn';


const Registration = () => {
    // const { divisions, districts, upazilas, bloodGroups, logOut } = UseAuthContext()
    // const [captchaInput, setCaptchaInput] = useState('');
    const [loading, setLoading] = useState(false);
    // const [captchaResult, setCaptchaResult] = useState(false);
    // const { createUserEmailPass } = UseAuthContext();
    // const [selectedDivision, setSelectedDivision] = useState({})
    // const [selectedDistrict, setSelectedDistrict] = useState({})
    // const [selectedUpazila, setSelectedUpazila] = useState({})
    // const [selectedBloodGroup, setSelectedbloodGroup] = useState({})
    const [toggle, setToggle] = useState(false)
    // const axiosPublic = UseAxiosPublic()
    // const navigate = useNavigate()

console.log(setLoading)

    // const handleRegisterSubmit = (e) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     const form = new FormData(e.currentTarget);
    //     const name = form.get('userName')
    //     const email = form.get('userEmail')
    //     const password = form.get('userPassword');
    //     const confirmPassword = form.get('confirmPassword');
    //     const img = form.get('userImage')
    //     const image = { 'image': img };
    //     const API_KEY = 'f6a950227b2e6c0fda979d39facb73d8';
    //     const joinDate = new Date()
    //     const api = `https://api.imgbb.com/1/upload?key=${API_KEY}`
    //     if (password !== confirmPassword) {
    //         alert("password not matched");
    //         setLoading(false)
    //         return;
    //     }

    //     console.log();
    //     // ======================= user authentication and send data server =============================
    //     createUserEmailPass(email, password)
    //         .then(async () => {
    //             const status = 0;
    //             localStorage.setItem('profileUpdateStatus', JSON.stringify(status))
    //             if (image?.image?.name) {
    //                 const res = await axios.post(api, image, {
    //                     headers: {
    //                         'content-type': 'multipart/form-data'
    //                     }
    //                 })
    //                 const userDetails = {
    //                     donarName: name,
    //                     donarEmail: email,
    //                     donarImage: res?.data?.data?.display_url || null,
    //                     Division: selectedDivision || null,
    //                     District: selectedDistrict || null,
    //                     Upazila: selectedUpazila || null,
    //                     BloodGroup: selectedBloodGroup || null,
    //                     status: 'pending',
    //                     userRole: 'user',
    //                     profileUpdateStatus: 0
    //                 }
    //                 axiosPublic.post('/api/v1/all-users', userDetails)
    //                     .then(res => {
    //                         if (res?.data?.acknowledged) {
    //                             Swal.fire({
    //                                 position: "top-end",
    //                                 icon: "success",
    //                                 title: "Account created Successful , login now",
    //                                 showConfirmButton: false,
    //                                 timer: 1500
    //                             });
    //                             logOut()
    //                                 .then(() => navigate('/login'))

    //                             setLoading(false)
    //                             e.target.reset()
    //                         }
    //                     })
    //                     .catch(error => console.log(error))

    //                 logOut()
    //                     .then(() => navigate('/login'))
    //                 setLoading(false)
    //             }
    //             else {
    //                 const userDetails = {
    //                     donarName: name,
    //                     donarEmail: email,
    //                     donarImage: null,
    //                     Division: selectedDivision || null,
    //                     District: selectedDistrict || null,
    //                     Upazila: selectedUpazila || null,
    //                     joiningDate: joinDate,
    //                     BloodGroup: selectedBloodGroup || null,
    //                     status: 'pending',
    //                     userRole: 'donar',
    //                     profileUpdateStatus: 0
    //                 }
    //                 axiosPublic.post('/api/v1/all-users', userDetails)
    //                     .then(res => {
    //                         if (res?.data?.acknowledged) {
    //                             Swal.fire({
    //                                 position: "top-end",
    //                                 icon: "success",
    //                                 title: "Account created Successful , login now",
    //                                 showConfirmButton: false,
    //                                 timer: 1500
    //                             });
    //                             logOut()
    //                                 .then(() => navigate('/login'))

    //                             setLoading(false)
    //                             e.target.reset()
    //                         }
    //                     })
    //                     .catch(error => console.log(error))
    //             }

    //         })
    //         .catch(error => {
    //             Swal.fire(`${error.message}`);
    //             setLoading(false)
    //             e.currentTarget.reset()
    //         })

    // }
    // // ====================== captcha validataion = =================================================
    // const captchaValidation = () => {
    //     console.log(captchaInput);
    //     if (validateCaptcha(captchaInput) === true) {
    //         setCaptchaResult(true);
    //     }
    //     else {
    //         alert('Captcha not matched');
    //         setCaptchaInput('')
    //     }
    // }

    // useEffect(() => {
    //     loadCaptchaEnginge(6)
    // }, [])


    return (
        <div>
            <Helmet>
                <title> Registration</title>
            </Helmet>
            <div className="hero bg-base-200   min-h-screen">

                <div className="hero-content  flex-col md:flex-row lg:gap-20">

                    <div className="text-center lg:text-left">
                        <img className='rounded-md w-[500px] h-[600px]' src={img} alt="" />
                    </div>
                    <div className="card border border-red-600 py-10 bg-base-100 sm:relative sm:-top-60 md:top-auto w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className='flex items-center text-2xl justify-center'>Register for Borrowing  <svg
                            width={40}
                            height={40}
                            viewBox="0 0 64 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-label="Library Logo"
                        >
                            {/* Book shape */}
                            <rect x="8" y="12" width="48" height="40" rx="4" ry="4" stroke={"#1f2937"} strokeWidth="3" fill="#f9fafb" />

                            {/* Pages lines */}
                            <line x1="20" y1="20" x2="44" y2="20" stroke={"#1f2937"} strokeWidth="2" />
                            <line x1="20" y1="28" x2="44" y2="28" stroke={"#1f2937"} strokeWidth="2" />
                            <line x1="20" y1="36" x2="44" y2="36" stroke={"#1f2937"} strokeWidth="2" />
                            <line x1="20" y1="44" x2="44" y2="44" stroke={"#1f2937"} strokeWidth="2" />

                            {/* Spine */}
                            <rect x="8" y="12" width="6" height="40" fill={"#1f2937"} />
                        </svg></h1>
                        <form className="card-body">

                            <div className="form-control">

                                <input type="text" placeholder="Your name" name='userName' className="input focus:outline-none focus:border-black input-bordered" required />
                            </div>
                            <div className="form-control">

                                <input type="email" placeholder="email" name='userEmail' className="input focus:outline-none focus:border-black input-bordered" required />
                            </div>
                            {/* ================= zilla upazilla, distric, blood group ===================== */}



                            <div className="form-control relative">

                                <input type={toggle ? 'text' : 'password'} placeholder="password" name='userPassword' className="input focus:outline-none focus:border-black input-bordered" required />
                                <div onClick={() => setToggle(!toggle)} className='absolute top-3 right-5 cursor-pointer rounded-full'>
                                    {toggle ? <BsEyeFill size={25}></BsEyeFill> : <BsEyeSlashFill size={25}></BsEyeSlashFill>}
                                </div>
                                <input type={toggle ? 'text' : 'password'} placeholder="Confirm password" name='confirmPassword' className="input mt-2 focus:outline-none focus:border-black input-bordered" required />

                            </div>
                            {/* <div className="form-control relative ">
                                <div className='my-5'>
                                    <LoadCanvasTemplateNoReload></LoadCanvasTemplateNoReload>
                                </div>
                                <input onKeyUp={(e) => setCaptchaInput(e.target.value)} defaultValue={captchaInput} type="text" placeholder="input captcha" className="input focus:outline-none focus:border-black input-bordered" required />
                                <span onClick={captchaValidation} className='btn text-white btn-success absolute bottom-0 right-0 rounded-tl-none rounded-bl-none'>{captchaResult ? <GiCheckMark></GiCheckMark> : 'check now'}</span>
                            </div> */}

                          

                            <div className="form-control my-2">
                                <button  className="btn bg-green-700 text-white hover:bg-green-800">{loading ? <span className="loading loading-spinner"></span> : 'Register Now'}</button>
                            </div>
                            <p className='text-sm text-center text-gray-600'>Already have an account ? <Link className='text-green-700 underline-offset-4 underline' to='/login'>Login</Link></p>
                        </form>
                    <GoogleSIgnIn></GoogleSIgnIn>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Registration;