import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../Services/Firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
export const AuthContext = createContext([]);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();
    console.log(user);
    const createUserEmailPass =(email, password)=>{
       return createUserWithEmailAndPassword(auth, email,password)
    }
    const signInEmailPass =(email, password)=>{
        return signInWithEmailAndPassword(auth, email,password);
    }
    const logOut =()=>{
        return signOut(auth)
    }

    useEffect(()=>{
        const subscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
        })
        return ()=>{
            return subscribe
        }
    },[])

    const info = {
        createUserEmailPass,
        signInEmailPass,
        user,
        logOut
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