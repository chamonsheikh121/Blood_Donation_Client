import { useRef } from "react";
import UseAuthContext from "../../Hooks/UseAuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const ResetPassword = () => {
    const emailInput = useRef()
    const { resetPass } = UseAuthContext()

    const handleReset = () => {
        const email = emailInput.current.value;
        resetPass(email)
            .then(() => {
                Swal.fire(`${'please, check your email'}`);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 ">
            <div className="bg-gray-200 p-10">
                <div className="shadow-2xl w-full flex flex-col">
                    <label className="pb-4">
                        <span className="label-text ">Email</span>
                    </label>
                    <input ref={emailInput} type="email" placeholder="Enter your email" className="input input-bordered" required />
                </div>

                <div className="form-control mt-6">
                    <button onClick={handleReset} className="btn bg-red-700 hover:bg-red-800 text-white">Reset now</button>
                </div>
                <button className="mt-2 underline">
                    <Link to='/login'>Back to login</Link>
                </button>

            </div>
        </div>
    );
};

export default ResetPassword;