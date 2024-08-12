import { useEffect, useState } from "react";


const UseRegisterInfo = () => {

    const [divisions, setDivisions] = useState([])
    const [districts, setDistricts] = useState([])
    const [upazilas, setUpazilas] = useState([])
    const [bloodGroups, setBloodGroups] = useState([])
    console.log(divisions);

    useEffect(() => {

        fetch('Division.json')
            .then(res => res.json())
            .then(data => setDivisions(data))

        fetch('District.json')
            .then(res => res.json())
            .then(data => setDistricts(data))

        fetch('Upazilas.json')
            .then(res => res.json())
            .then(data => setUpazilas(data));
        fetch('BloodGroups.json')
            .then(res => res.json())
            .then(data => setBloodGroups(data))

    }, [])

    return [divisions, districts, upazilas, bloodGroups]
};

export default UseRegisterInfo;