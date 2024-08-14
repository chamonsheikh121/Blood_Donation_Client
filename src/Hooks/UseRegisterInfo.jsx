import { useEffect, useState } from "react";


const UseRegisterInfo = () => {

    const [divisions, setDivisions] = useState([])
    const [districts, setDistricts] = useState([])
    const [upazilas, setUpazilas] = useState([])
    const [bloodGroups, setBloodGroups] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            await fetch('/Division.json')
                .then(res => res.json())
                .then(data => setDivisions(data))

            await fetch('/District.json')
                .then(res => res.json())
                .then(data => setDistricts(data))

            await fetch('/Upazilas.json')
                .then(res => res.json())
                .then(data => setUpazilas(data));
            await fetch('/BloodGroups.json')
                .then(res => res.json())
                .then(data => setBloodGroups(data))
        }
        fetchData()

    }, [])

    return [divisions, districts, upazilas, bloodGroups]
};

export default UseRegisterInfo;