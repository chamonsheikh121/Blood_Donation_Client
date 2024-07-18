import { useEffect, useState } from 'react';
import image from './../../assets/Registration/5137726_2706868.jpg'
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { Link } from 'react-router-dom';
import { GiCheckMark } from "react-icons/gi";
import UseAuthContext from '../../Hooks/UseAuthContext';
import blood from './../../assets/Registration/blood.png'
const Registration = () => {
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaResult, setCaptchaResult] = useState(false);
    const { createUserEmailPass } = UseAuthContext();

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('userName')
        const email = form.get('userEmail')
        const password = form.get('userPassword');
        const confirmPassword = form.get('confirmPassword');
        console.log('before', name, email, password, confirmPassword);
        if (password !== confirmPassword) {
            alert("password not matched");
            return;
        }

        createUserEmailPass(email, password)
            .then(result => console.log(result))
            .catch(error => console.log(error))

    }



    const captchaValidation = () => {
        console.log(captchaInput);
        if (validateCaptcha(captchaInput) === true) {
            setCaptchaResult(true);
        }
        else {
            alert('Captcha not matched');
        }
    }
    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])
    return (
        <div>
            
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
                            <div className="form-control">

                                <input type="password" placeholder="password" name='userPassword' className="input focus:outline-none focus:border-black input-bordered" required />

                                <input type="password" placeholder="Confirm password" name='confirmPassword' className="input mt-2 focus:outline-none focus:border-black input-bordered" required />

                            </div>
                            <div className="form-control relative ">
                                <div className='my-5'>
                                    <LoadCanvasTemplateNoReload></LoadCanvasTemplateNoReload>
                                </div>
                                <input onKeyUp={(e) => setCaptchaInput(e.target.value)} type="text" placeholder="input captcha" className="input focus:outline-none focus:border-black input-bordered" required />
                                <span onClick={captchaValidation} className='btn text-white btn-success absolute bottom-0 right-0 rounded-tl-none rounded-bl-none'>{captchaResult ? <GiCheckMark></GiCheckMark> : 'check now'}</span>
                            </div>

                            <div className="form-control mt-6">
                                <button disabled={!captchaResult} className="btn btn-primary">Register Now</button>
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