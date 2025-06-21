import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const GoogleSIgnIn = () => {

    const { googleLogin, admin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await googleLogin();
            const user = result.user;
            console.log('User info:', user);

            // Generate random student ID (e.g., ST-394857)
            const generateStudentId = () => {
                return 'ST-' + Math.floor(100000 + Math.random() * 900000);
            };

            // Prepare student object
            const student = {
                name: "", // not provided
                studentId: generateStudentId(),
                email: user.email,
                department: "",
                profileImage: user.photoURL || "https://randomuser.me/api/portraits/lego/1.jpg", // fallback image
            };

            // Store student info to localStorage
            localStorage.setItem('student', JSON.stringify(student));

            // Redirect based on role
            if (admin === user?.email) {
                navigate('/admin');
            } else {
                navigate('/profile');
            }
        } catch (error) {
            console.error('Google login failed:', error);
            alert('Google Sign-In failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center my-5">
            <button
                onClick={handleGoogleSignIn}
                className="flex items-center gap-3 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded shadow hover:shadow-md transition duration-200"
            >
                <FaGoogle size={30}></FaGoogle>
                <span>SignIN with Google</span>
            </button>
        </div>
    );

};

export default GoogleSIgnIn;