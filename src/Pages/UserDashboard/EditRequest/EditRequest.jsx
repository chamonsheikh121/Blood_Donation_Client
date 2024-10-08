import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAuthContext from "../../../Hooks/UseAuthContext";
import UseUser from "../../../Hooks/UseUser";
import axios from "axios";
import Swal from "sweetalert2";
import { DNA } from "react-loader-spinner";
import { MdOutlineNumbers, MdOutlineQrCode2 } from "react-icons/md";


const EditRequest = () => {
    const param = useParams()
    const axiosPublic = UseAxiosPublic()
    const { user, bloodGroups, divisions, districts, upazilas } = UseAuthContext()
    const [data] = UseUser()
    const [selectedBloodGroup, setSelectedBloodGroup] = useState();
    const [selectedDivision, setSelectedDivision] = useState()
    const [selectedDistrict, setSelectedDistrict] = useState()
    const [selectedUpazila, setSelectedUpazila] = useState()
    const [loading, setLoading] = useState(false)
    const [editAbleData, setEditableData] = useState()
    const Navigate = useNavigate()

    if (editAbleData) {
        var { _id, requesterName, requestedBloodGroup, requesterDivision, requesterDistrict, requesterUpazila, requesterHospital, requestedDate, requestedTime, requesterPhone, requesterFullAddress, requesterMessage, requesterImage, serialNumber } = editAbleData
    }



    const handleSubmitRequest = async (e) => {
        e.preventDefault()
        setLoading(true)
        const form = new FormData(e.currentTarget);
        const recipientName = form.get('RecipientName')
        const hospitalName = form.get('HospitalName')
        const date = form.get('date');
        const time = form.get('time');
        const phone = form.get('phone')
        const fullAddress = form.get('fullAddress')
        const requesterMess = form.get('requesterMessage');
        const photo = form.get('file');
        const image = { 'image': photo };
        if (!photo?.name &&
            recipientName == requesterName &&
            hospitalName == requesterHospital &&
            data == requestedDate &&
            time == requestedTime &&
            phone == requesterPhone &&
            fullAddress == requesterFullAddress &&
            requesterMess == requesterMessage
        ) {
            alert('Nothing to be update')
            setLoading(false)
            return
        }
        if (photo?.name) {
            const api_key = 'f6a950227b2e6c0fda979d39facb73d8';
            const api = `https://api.imgbb.com/1/upload?key=${api_key}`
            const res = await axios.post(api, image, {
                headers:
                {
                    'content-type': 'multipart/form-data'
                }
            })
            if (res?.data?.success) {
                const RequestInfo = {
                    requestId: _id,
                    requesterName: recipientName || requesterName,
                    requestedBloodGroup: selectedBloodGroup || requestedBloodGroup,
                    requesterDivision: selectedDivision || requesterDivision,
                    requesterDistrict: selectedDistrict || requesterDistrict,
                    requesterUpazila: selectedUpazila || requesterUpazila,
                    requesterHospital: hospitalName || requesterHospital,
                    requestedDate: date || requestedDate,
                    requestedTime: time || requestedTime,
                    requesterPhone: phone || requesterPhone,
                    requesterFullAddress: fullAddress || requesterFullAddress,
                    requesterMessage: requesterMess || requesterMessage,
                    requesterImage: res?.data?.data?.display_url || requesterImage
                }
                if (user?.email) {
                    const infoRes = await axiosPublic.patch('/api/v1/update-request', RequestInfo)
                    const data = infoRes?.data
                    if (data?.acknowledged) {
                        setLoading(false)
                        Swal.fire({
                            title: "Updated successfully",
                            icon: "success",
                            cancelButtonText: "update more",
                            confirmButtonColor: "#713ae9",
                            cancelButtonColor: "#00ff59",
                            confirmButtonText: "see details"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Navigate(`/dashboard/my-donation-requests/${_id}`)
                            }
                        });
                    }
                    else {
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "Oops ! Failed to submit",
                            showConfirmButton: false,
                            timer: 2000
                        });
                        setLoading(false)
                    }
                }

            }
            else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Oops ! failed to update file",
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }
        else {
            const RequestInfo = {
                requestId: _id,
                requesterName: recipientName || requesterName,
                requestedBloodGroup: selectedBloodGroup || requestedBloodGroup,
                requesterDivision: selectedDivision || requesterDivision,
                requesterDistrict: selectedDistrict || requesterDistrict,
                requesterUpazila: selectedUpazila || requesterUpazila,
                requesterHospital: hospitalName || requesterHospital,
                requestedDate: date || requestedDate,
                requestedTime: time || requestedTime,
                requesterPhone: phone || requesterPhone,
                requesterFullAddress: fullAddress || requesterFullAddress,
                requesterMessage: requesterMess || requesterMessage,
                requesterImage: requesterImage

            }
            if (user?.email) {
                const infoRes = await axiosPublic.patch('/api/v1/update-request', RequestInfo)
                const data = infoRes?.data
                if (data?.acknowledged) {
                    setLoading(false)
                    Swal.fire({
                        title: "Updated successfully",
                        icon: "success",
                        showCancelButton: true,
                        cancelButtonText: "update more",
                        confirmButtonColor: "#713ae9",
                        cancelButtonColor: "#13a100",
                        confirmButtonText: "see details"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Navigate(`/dashboard/my-donation-requests/${_id}`)
                        }
                    });



                }
                else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Oops ! Failed to submit",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setLoading(false)
                }
            }
            setLoading(false)
        }

    }





    useEffect(() => {
        if (param?.id) {
            const fetchData = async () => {
                const res = await axiosPublic.get(`/api/v1/findOne/${param?.id}`)
                const data = res?.data;
                setEditableData(data)
            }
            fetchData()
        }

    }, [param, axiosPublic])

    if (!editAbleData) {
        return <div className="w-full flex items-center justify-center mt-10">
            <DNA
                visible={true}
                height="100"
                width="100"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    }

    return (
        <div>

            <form onSubmit={handleSubmitRequest} className="bg-white max-w-5xl  space-y-5 mt-10 rounded-md p-10 text-gray-700 mx-auto">
                <div className="flex justify-end">
                    <div className="border inline-block p-2 ">
                        <span className="flex items-center gap-2"><MdOutlineQrCode2></MdOutlineQrCode2> ID: <span>{_id}</span></span>
                        <span className="flex items-center gap-2"><MdOutlineNumbers></MdOutlineNumbers> S. no : <span>{serialNumber}</span></span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="RequesterName">Requester name:</label>
                        <input defaultValue={data?.donarName} disabled type="text" name="" className="py-2 border  bg-gray-300 placeholder:text-gray-500 pl-5 cursor-not-allowed focus:bg-white " required placeholder="Name" id="RequesterName" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center gap-2">
                        <label htmlFor="RequesterName">Requester email:</label>
                        <input defaultValue={user?.email} disabled type="email" name="" className="py-2 border bg-gray-300 placeholder:text-gray-500 cursor-not-allowed  pl-5 focus:bg-white " required placeholder="Email" id="RequesterName" />
                    </div>
                </div>



                <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="RecipientName">Recipient name:</label>
                        <input type="text" defaultValue={requesterName} name="RecipientName" className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white " required placeholder="Name" id="RecipientName" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center gap-2">
                        <label htmlFor="HospitalName">Hospital name:</label>
                        <input type="text" defaultValue={requesterHospital} name="HospitalName" className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white " required placeholder="Hospital name" id="HospitalName" />
                    </div>
                </div>



                <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="bloodGroup">Blood group:</label>
                        <select id="bloodGroup" defaultValue={requestedBloodGroup} required onChange={(e) => setSelectedBloodGroup(JSON.parse(e.target.value))} className={`py-2 ${selectedBloodGroup ? 'border' : 'border-red-700 border'} bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white`} >
                            <option disabled selected>{requestedBloodGroup}</option>
                            {
                                bloodGroups?.length > 0 && bloodGroups.map((bloodGroup, i) => <option key={i}
                                    value={JSON.stringify(bloodGroup.group)}
                                >{bloodGroup.group}</option>)
                            }

                        </select>
                    </div>
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="division">Division :</label>
                        <select id="division" required onChange={(e) => setSelectedDivision(JSON.parse(e.target.value))} className={`py-2 ${selectedDivision ? 'border' : 'border border-red-700'} bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white`}>
                            <option disabled selected>{requesterDivision?.name}, {requesterDivision?.bn_name}</option>
                            {
                                divisions?.length > 0 && divisions.map(division => <option key={division.id}
                                    value={JSON.stringify(division)}
                                >{division?.bn_name}, {division?.name}</option>)
                            }

                        </select>
                    </div>
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="district">District :</label>
                        <select id="district" required onChange={(e) => setSelectedDistrict(JSON.parse(e.target.value))} className={`py-2 ${selectedDistrict ? 'border' : 'border border-red-700'} bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white`}>
                            <option disabled selected>{requesterDistrict?.name}, {requesterDistrict?.bn_name}</option>
                            {
                                districts?.length > 0 && districts.map(district => {
                                    {
                                        if (district?.division_id == selectedDivision?.id) {
                                            return <option key={district.id}
                                                value={JSON.stringify(district)}
                                            >{district.bn_name}, {district.name}</option>
                                        }

                                    }
                                })
                            }

                        </select>
                    </div>
                </div>



                <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="upazila">Upazila:</label>
                        <select id="upazila" required onChange={(e) => setSelectedUpazila(JSON.parse(e.target.value))} className={`py-2 ${selectedUpazila ? 'border' : 'border border-red-700'} bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white`} >
                            <option disabled selected>{requesterUpazila?.name}, {requesterUpazila?.bn_name}</option>
                            {
                                upazilas?.length > 0 && upazilas.map(upazila => {
                                    {
                                        if (upazila?.district_id == selectedDistrict?.id) {
                                            return <option key={upazila.id}
                                                value={JSON.stringify(upazila)}
                                            >{upazila?.bn_name}, {upazila?.name} </option>
                                        }

                                    }
                                })
                            }

                        </select>
                    </div>
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="date">Donation date:</label>
                        <input type="date" defaultValue={requestedDate} name="date" className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white " required placeholder="Name" id="date" />
                    </div>
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="time">Donation time:</label>
                        <input type="time" defaultValue={requestedTime} name="time" className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white " required placeholder="Name" id="time" />
                    </div>
                </div>



                <div className="flex flex-col md:flex-row gap-10">

                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="Phone">Phone No:</label>
                        <input type="number" defaultValue={requesterPhone} name="phone" className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white " required placeholder="Phone number" id="Phone" />
                    </div>
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="FullAddress">Full Address No:</label>
                        <input type="text" defaultValue={requesterFullAddress} name="fullAddress" className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white " required placeholder="Address" id="FullAddress" />
                    </div>

                </div>



                <div className="flex gap-10">

                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="TextArea">Request message:</label>
                        <textarea name="requesterMessage" defaultValue={requesterMessage} id="requesterMessage" required placeholder="why do you need blood describe in this input field
in details"  className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white h-[100px]"  ></textarea>
                    </div>


                </div>



                <div className="flex flex-col items-center gap-2 md:items-start">
                    <label htmlFor="file">Photo :</label>
                    <input type="file" name="file" id="file" className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white" />

                </div>

                <div className="max-w-md mx-auto">
                    <button className=" border hover:bg-red-800 bg-red-700 w-full py-2 text-white btn">{loading ? <span className="loading"></span> : 'Update now'}</button>
                </div>


            </form>

        </div>
    );
};

export default EditRequest;