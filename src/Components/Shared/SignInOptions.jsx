import { FcGoogle } from "react-icons/fc";
import UseAuthContext from "../../Hooks/UseAuthContext";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";

const SignInOptions = () => {

    const { googleLogin } = UseAuthContext();
    const axiosPublic = UseAxiosPublic()
    const navigate = useNavigate()


    const handleGoogleLogin = () => {
        googleLogin()
            .then(async (result) => {
                console.log(result);
                // const object = {email: 'sheikhchamon9@gmail.com', age:10}
                const res = await axiosPublic.get(`/api/v1/find-user/?email=${result?.user?.email}`)
                const data = res?.data;
                if (!data) {
                    const userDetails = {
                        donarName: result?.user?.displayName || '',
                        donarEmail: result?.user?.email,
                        donarImage: result?.user?.photoURL || null,
                        Status: 'block',
                        userRole: 'user'
                    }
                    axiosPublic.post('/api/v1/all-users', userDetails)
                        .then(res => {
                            if (res?.data?.acknowledged) {
                                Swal.fire({
                                    title: "Logged in successfully",
                                    icon: 'success',
                                    timer: 1000,
                                });
                                navigate('/')


                            }
                        })
                        .catch(error => console.log(error))

                }
                else {
                    Swal.fire({
                        title: "Logged in successfully",
                        icon: 'success',
                        timer: 1000,
                    });
                    navigate('/')
                }

            })
            .catch(error => console.log(error))
    }

    return (
        <div className="w-full flex justify-center items-center gap-10 p-2">
            <span onClick={handleGoogleLogin} className="p-1 cursor-pointer border rounded-full border-red-700">
                <FcGoogle size={40}></FcGoogle></span>
            <span onClick={handleGoogleLogin} className="p-1 cursor-pointer border rounded-full border-red-700">
                <FaGithub size={40}></FaGithub></span>
        </div>
    );
};

export default SignInOptions;