import { useEffect, useState } from 'react';
import image from './../../assets/Registration/5137726_2706868.jpg'
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { Link, useNavigate } from 'react-router-dom';
import { GiCheckMark } from "react-icons/gi";
import UseAuthContext from '../../Hooks/UseAuthContext';
import blood from './../../assets/Registration/blood.png'
import axios from 'axios';
import Swal from 'sweetalert2';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import { Helmet } from 'react-helmet';


const Registration = () => {
    const { divisions, districts, upazilas, bloodGroups, logOut } = UseAuthContext()
    const [captchaInput, setCaptchaInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [captchaResult, setCaptchaResult] = useState(false);
    const { createUserEmailPass } = UseAuthContext();
    const [selectedDivision, setSelectedDivision] = useState({})
    const [selectedDistrict, setSelectedDistrict] = useState({})
    const [selectedUpazila, setSelectedUpazila] = useState({})
    const [selectedBloodGroup, setSelectedbloodGroup] = useState({})
    const [toggle, setToggle] = useState(false)
    const axiosPublic = UseAxiosPublic()
    const navigate = useNavigate()



    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.currentTarget);
        const name = form.get('userName')
        const email = form.get('userEmail')
        const password = form.get('userPassword');
        const confirmPassword = form.get('confirmPassword');
        const img = form.get('userImage')
        const image = { 'image': img };
        const API_KEY = 'f6a950227b2e6c0fda979d39facb73d8';
        const joinDate = new Date()
        const api = `https://api.imgbb.com/1/upload?key=${API_KEY}`
        if (password !== confirmPassword) {
            alert("password not matched");
            setLoading(false)
            return;
        }

        console.log();
        // ======================= user authentication and send data server =============================
        createUserEmailPass(email, password)
            .then(async () => {
                if (image?.image?.name) {
                    const res = await axios.post(api, image, {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })
                    const userDetails = {
                        donarName: name,
                        donarEmail: email,
                        donarImage: res?.data?.data?.display_url || null,
                        Division: selectedDivision || null,
                        District: selectedDistrict || null,
                        Upazila: selectedUpazila || null,
                        BloodGroup: selectedBloodGroup || null,
                        Status: 'pending',
                        userRole: 'user'
                    }
                    axiosPublic.post('/api/v1/all-users', userDetails)
                        .then(res => {
                            if (res?.data?.acknowledged) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Account created Successful , login now",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                logOut()
                                    .then(() => navigate('/login'))

                                setLoading(false)
                                e.target.reset()
                            }
                        })
                        .catch(error => console.log(error))

                    logOut()
                        .then(() => navigate('/login'))
                    setLoading(false)
                }
                else {
                    const userDetails = {
                        donarName: name,
                        donarEmail: email,
                        donarImage: null,
                        Division: selectedDivision || null,
                        District: selectedDistrict || null,
                        Upazila: selectedUpazila || null,
                        joiningDate: joinDate,
                        BloodGroup: selectedBloodGroup || null,
                        Status: 'pending',
                        userRole: 'donar'
                    }
                    axiosPublic.post('/api/v1/all-users', userDetails)
                        .then(res => {
                            if (res?.data?.acknowledged) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Account created Successful , login now",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                logOut()
                                    .then(() => navigate('/login'))

                                setLoading(false)
                                e.target.reset()
                            }
                        })
                        .catch(error => console.log(error))
                }

            })
            .catch(error => {
                Swal.fire(`${error.message}`);
                setLoading(false)
                e.currentTarget.reset()
            })

    }
    // ====================== captcha validataion = =================================================
    const captchaValidation = () => {
        console.log(captchaInput);
        if (validateCaptcha(captchaInput) === true) {
            setCaptchaResult(true);
        }
        else {
            alert('Captcha not matched');
            setCaptchaInput('')
        }
    }

    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])


    return (
        <div>
            <Helmet>
                <title> Registration</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">

                <div className="hero-content flex-col md:flex-row lg:gap-20">

                    <div className="text-center lg:text-left">
                        <img className='rounded-md' src={image} alt="" />
                    </div>
                    <div className="card bg-base-100 sm:relative sm:-top-60 md:top-auto w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className='flex items-center text-2xl justify-center'>Register for <img className='w-[50px]' src={blood} /></h1>
                        <form onSubmit={handleRegisterSubmit} className="card-body">

                            <div className="form-control">

                                <input type="text" placeholder="Your name" name='userName' className="input focus:outline-none focus:border-black input-bordered" required />
                            </div>
                            <div className="form-control">

                                <input type="email" placeholder="email" name='userEmail' className="input focus:outline-none focus:border-black input-bordered" required />
                            </div>
                            {/* ================= zilla upazilla, distric, blood group ===================== */}
                            <div className="flex gap-2 items-center flex-col lg:flex-row">
                                <div className='w-full'>
                                    <span className='text-xs'>Blood group:</span>
                                    <select required onChange={(e) => setSelectedbloodGroup(JSON.parse(e.target.value))} className="select select-bordered focus:outline-none select-sm w-full max-w-xs">
                                        <option disabled selected>Select blood</option>
                                        {
                                            bloodGroups?.length > 0 && bloodGroups.map((bloodGroup, i) => <option key={i}
                                                value={JSON.stringify(bloodGroup)}
                                            >{bloodGroup.group}</option>)
                                        }

                                    </select>
                                </div>
                                <div className='w-full'>
                                    <span className='text-xs'>Divison:</span>
                                    <select required onChange={(e) => setSelectedDivision(JSON.parse(e.target.value))} className="select select-bordered focus:outline-none select-sm w-full max-w-xs">
                                        <option disabled selected>Select Division</option>
                                        {
                                            divisions?.length > 0 && divisions.map(division => <option key={division.id}
                                                value={JSON.stringify(division)}
                                            >{division.bn_name}, {division.name}</option>)
                                        }

                                    </select>
                                </div>

                            </div>
                            <div className="flex gap-2 items-center flex-col lg:flex-row">
                                {/* =================== */}
                                <div className='w-full'>
                                    <span className='text-xs'>District :</span>
                                    <select required onChange={(e) => setSelectedDistrict(JSON.parse(e.target.value))} className="select select-bordered focus:outline-none select-sm w-full max-w-xs">
                                        <option disabled selected>Select District</option>
                                        {
                                            districts?.length > 0 && districts.map(district => {
                                                {
                                                    if (district.division_id == selectedDivision.id) {
                                                        return <option key={district.id}
                                                            value={JSON.stringify(district)}
                                                        >{district.bn_name}, {district.name}</option>
                                                    }

                                                }
                                            })
                                        }

                                    </select>
                                </div>
                                <div className='w-full'>
                                    <span className='text-xs'>Upazila :</span>
                                    <select required onChange={(e) => setSelectedUpazila(JSON.parse(e.target.value))} className="select select-bordered focus:outline-none select-sm w-full max-w-xs">
                                        <option disabled selected>Select upazila</option>
                                        {
                                            upazilas?.length > 0 && upazilas.map(upazila => {
                                                {
                                                    if (upazila.district_id == selectedDistrict.id) {
                                                        return <option key={upazila.id}
                                                            value={JSON.stringify(upazila)}
                                                        >{upazila.bn_name}, {upazila.name} </option>
                                                    }

                                                }
                                            })
                                        }

                                    </select>
                                </div>
                            </div>

                            <div className="form-control relative">

                                <input type={toggle ? 'text' : 'password'} placeholder="password" name='userPassword' className="input focus:outline-none focus:border-black input-bordered" required />
                                <div onClick={() => setToggle(!toggle)} className='absolute top-3 right-5 cursor-pointer rounded-full'>
                                    {toggle ? <BsEyeFill size={25}></BsEyeFill> : <BsEyeSlashFill size={25}></BsEyeSlashFill>}
                                </div>
                                <input type={toggle ? 'text' : 'password'} placeholder="Confirm password" name='confirmPassword' className="input mt-2 focus:outline-none focus:border-black input-bordered" required />

                            </div>
                            <div className="form-control relative ">
                                <div className='my-5'>
                                    <LoadCanvasTemplateNoReload></LoadCanvasTemplateNoReload>
                                </div>
                                <input onKeyUp={(e) => setCaptchaInput(e.target.value)} defaultValue={captchaInput} type="text" placeholder="input captcha" className="input focus:outline-none focus:border-black input-bordered" required />
                                <span onClick={captchaValidation} className='btn text-white btn-success absolute bottom-0 right-0 rounded-tl-none rounded-bl-none'>{captchaResult ? <GiCheckMark></GiCheckMark> : 'check now'}</span>
                            </div>

                            <input type="file" name='userImage' className="file-input mt-2 focus:outline-none file-input-bordered file-input-sm w-full max-w-xs" />

                            <div className="form-control my-2">
                                <button disabled={!captchaResult} className="btn bg-red-700 text-white hover:bg-red-800">{loading ? <span className="loading loading-spinner"></span> : 'Register Now'}</button>
                            </div>
                            <p className='text-sm text-center text-gray-600'>Already have an account ? <Link className='text-red-700 underline-offset-4 underline' to='/login'>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Registration;