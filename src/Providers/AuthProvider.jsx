import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../Services/Firebase.config";

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, sendEmailVerification, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext([])


const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();
    const admin = "afrojabegum14@gmail.com"



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
        })
        return () => {
            return subscribe
        }
    }, [])
    

    const info = {
        createUserEmailPass,
        signInEmailPass,
        user,
        logOut,
        googleLogin,
        verifyEmail,
        resetPass,
        setUser,
        admin
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