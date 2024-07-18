import { Link, useNavigate } from "react-router-dom";
import image from './../../assets/Login/29313294_pq6o_qij1_220606.jpg'
import UseAuthContext from "../../Hooks/UseAuthContext";
import Swal from "sweetalert2";

const Login = () => {
    const { signInEmailPass } = UseAuthContext();
    const navigate = useNavigate();
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('userEmail');
        const password = form.get('userPassword');
        console.log(email, password);

        signInEmailPass(email, password)
            .then(() =>{
                Swal.fire({
                    title: "Logged in successfully",
                    icon: 'success',
                    timer: 1000,
                });
                navigate('/')
            })
            .catch(err => console.log(err));
    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col  lg:flex-row md:gap-20">
                    <div className="text-center lg:text-left">
                        <img className="w-[700px] rounded-md" src={image} alt="" />
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLoginSubmit} className="card-body">
                            <span>Email : </span>
                            <div className="form-control">

                                <input type="email" placeholder="email" name='userEmail' className="input focus:outline-none focus:border-black input-bordered" required />
                            </div>
                            <span>Password :</span>
                            <div className="form-control">

                                <input type="password" placeholder="password" name='userPassword' className="input focus:outline-none focus:border-black input-bordered" required />
                            </div>
                            <button className="btn mt-5 bg-red-600 text-white">Login now</button>
                            <p className='text-sm text-center text-gray-600'>New here ? <Link className='text-red-700 underline-offset-4 underline' to='/registration'>Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;