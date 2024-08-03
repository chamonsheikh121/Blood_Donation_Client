import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../Services/Firebase.config";

import { createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
export const AuthContext = createContext([]);


const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();

    const [loading, setLoading] = useState(true)
    const [divisions, setDivisions] = useState([])
    const [districts, setDistricts] = useState([])
    const [upazilas, setUpazilas] = useState([])
    const [bloodGroups, setBloodGroups] = useState([])

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
        return signOut(auth)
    }


    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)

        })
        return () => {
            return subscribe
        }
    }, [])
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
                console.log(err);
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
        loading
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