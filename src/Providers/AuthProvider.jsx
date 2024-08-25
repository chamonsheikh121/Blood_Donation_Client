import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../Services/Firebase.config";

import { createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
export const AuthContext = createContext([]);


const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true)
    const [divisions, setDivisions] = useState([])
    const [districts, setDistricts] = useState([])
    const [upazilas, setUpazilas] = useState([])
    const [bloodGroups, setBloodGroups] = useState([])
    const axiosPublic = UseAxiosPublic()

    const createUserEmailPass = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInEmailPass = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleLogin = () => {
        return signInWithPopup(auth, provider);
    }
    const logOut = () => {
        // localStorage.removeItem('user-token')
        return signOut(auth)
    }
    const verifyEmail = () => {
        return sendEmailVerification(auth?.currentUser)
    }
    const resetPass = (email) => {
        return sendPasswordResetEmail(auth, email)
    }


    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
            // const createToken = async () => {
            //     if (currentUser) {
            //         const userDoc = { email: currentUser?.email };
            //         const res = await axiosPublic.post('/api/v1/jwt', userDoc);
            //         const data = res.data;
            //         localStorage.setItem('user-token', JSON.stringify(data?.token))
            //         // console.log(data?.token);
            //     }
            // }
            // createToken()

        })
        return () => {
            return subscribe
        }
    }, [axiosPublic])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const divRes = await fetch('Division.json')
                const divData = await divRes.json();
                setDivisions(divData)
                const disRes = await fetch('District.json')
                const disData = await disRes.json();
                setDistricts(disData)
                const upaRes = await fetch('Upazilas.json')
                const upaData = await upaRes.json();
                setUpazilas(upaData)
                const bloodRes = await fetch('BloodGroups.json')
                const bloodData = await bloodRes.json();
                setBloodGroups(bloodData)

            }
            catch (err) {
                // console.log(err);
            }
        }
        fetchData()
    }, [])

    const info = {
        createUserEmailPass,
        signInEmailPass,
        user,
        logOut,
        googleLogin,
        divisions,
        districts,
        upazilas,
        bloodGroups,
        loading,
        verifyEmail,
        resetPass
    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
AuthProvider.propTypes = {
    children: PropTypes.node
}