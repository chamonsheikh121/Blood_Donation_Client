import { FcGoogle } from "react-icons/fc";
import UseAuthContext from "../../Hooks/UseAuthContext";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignInOptions = () => {

    const { googleLogin } = UseAuthContext();
    const navigate = useNavigate()

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result)
                navigate('/')
            })
            .catch(error =>console.log(error))
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