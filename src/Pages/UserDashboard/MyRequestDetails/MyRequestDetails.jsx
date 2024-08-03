import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import { DNA } from "react-loader-spinner";
import { FaCopy, FaRegUser } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { CiHospital1 } from "react-icons/ci";
import { MdAccessTime, MdDateRange, MdOutlineNumbers, MdOutlinePhoneInTalk, MdOutlineQrCode2 } from "react-icons/md";

import { BiDonateBlood, BiSolidMapPin } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";



const MyRequestDetails = () => {
    const axiosPublic = UseAxiosPublic()
    const [requestDetails, setRequestDetails] = useState()
    const [serialCopy, setSerialCopy] = useState(false)
    const [requestedId, setRequestedId] = useState(false)

    const handleSerialCopy = () => {
        navigator.clipboard.writeText(requestDetails?.serialNumber)
        setSerialCopy(true)
    }
    const handleRequestedId = () => {
        navigator.clipboard.writeText(requestDetails?._id)
        setRequestedId(true)
    }

    const param = useParams();
    useEffect(() => {
        const getData = async () => {
            if (param) {
                const res = await axiosPublic.get(`/api/v1/request-details/${param.id}`)
                const data = res.data;
                return setRequestDetails(data)
            }
        }
        getData()
    }, [param, axiosPublic])
    return (
        <div className="mb-20">

            {
                requestDetails ? <div className="mt-2">
                    <div className="flex lg:flex-row flex-col justify-center items-center lg:items-start gap-10 p-2 ">
                        <div className="bg-gradient-to-t from-gray-400 to-purple-600 flex flex-col lg:flex-row  items-start lg:p-5 gap-2 justify-between w-10/12 rounded-md">
                            <div className="lg:h-[400px]  lg:w-[600px]">
                                <img className="h-full w-full " src={requestDetails?.requesterImage} />
                            </div>

                            <div className="flex flex-col h-[400px] flex-1 items-center lg:items-start p-2">
                                <div className="text-white flex-1   pb-5 lg:pb-0 space-y-5 text-start  ">
                                    <p className="text-2xl md:text-4xl font-bold">Requested from :</p>
                                    <div className="flex items-center gap-2">
                                        <img className="h-[80px] w-[80px] p-2 bg-purple-700 rounded-full" src={requestDetails?.donarImage} alt="" />
                                        <div>
                                            <h3 className="text-xl  font-bold">{requestDetails?.donarName}</h3>
                                            <p className="font-semibold">{requestDetails?.donarEmail}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn block px-16 bg-white text-purple-700 hover:bg-purple-700 hover:text-white border-2 border-purple-700 font-semibold">Accept</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row text-gray-600 justify-between w-full lg:w-10/12 mx-auto lg:p-10 gap-5 items-start">
                        <div className="bg-white space-y-3 w-full p-5">
                            <div className="border-l-4 flex items-center gap-5 border-red-600 pl-2 space-y-2">
                                <p><FaRegUser size={25}></FaRegUser></p>
                                <div>
                                    <p className="text-xl font-bold">Requester :</p>
                                    <p className="font-semibold text-xl">{requestDetails?.requesterName}</p>
                                </div>
                            </div>
                            <hr className="border-gray-200 border-2" />
                            <div className="border-l-4 flex items-center gap-5 border-red-600 pl-2 space-y-2">
                                <p><BiDonateBlood size={25}></BiDonateBlood></p>

                                <div>
                                    <p className="text-xl font-bold ">Requested bloodGroup :</p>
                                    <p className="font-semibold text-xl">{requestDetails?.requestedBloodGroup}</p>
                                </div>
                            </div>
                            <hr className="border-gray-200 border-2" />
                            <div className="border-l-4  flex items-center gap-5 space-y-2 border-red-600 pl-2">
                                <p><GrLocation size={25}></GrLocation></p>

                                <div>
                                    <p className="text-xl font-bold ">Requested From :</p>
                                    <p className="font-semibold text-xl">
                                        <span className="block">{requestDetails?.requesterUpazila.name}, {requestDetails?.requesterUpazila.bn_name}  (Upazila)</span>
                                        <span className="block">{requestDetails?.requesterDistrict?.name}, {requestDetails?.requesterDistrict?.bn_name} (District)</span>
                                        <span className="block">{requestDetails?.requesterDivision.name}, {requestDetails?.requesterDivision.bn_name} (Division)</span></p>
                                </div>
                            </div>
                            <hr className="border-gray-200 border-2" />
                            <div className="border-l-4 flex items-center gap-5 border-red-600 pl-2 space-y-2">
                                <p><CiHospital1 size={25}></CiHospital1></p>

                                <div>
                                    <p className="text-xl font-bold ">Hospital Name :</p>
                                    <p className="font-semibold text-xl">{requestDetails?.requesterHospital}</p>
                                </div>
                            </div>
                            <hr className="border-gray-200 border-2" />
                            <div className="border-l-4 flex items-center gap-5 border-red-600 pl-2 space-y-2">
                                <p><BiSolidMapPin size={25}></BiSolidMapPin></p>

                                <div>
                                    <p className="text-xl font-bold ">Hospital full Address :</p>
                                    <p className="font-semibold text-xl">{requestDetails?.requesterFullAddress}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white w-full space-y-5 p-5">
                            <div className="border-l-4 flex items-center gap-5 border-red-600 pl-2 space-y-2">
                                <p><MdOutlineQrCode2 size={25}></MdOutlineQrCode2></p>

                                <div>
                                    <p className="font-semibold text-xl">Requested ID :</p>
                                    <p className="flex items-center gap-5">{requestDetails?._id}
                                        {
                                            requestedId ? <ImCheckmark onClick={handleRequestedId} className='inline ml-2 text-green-500 cursor-pointer' size={20}></ImCheckmark> : <FaCopy
                                                onClick={handleRequestedId}
                                                className="text-red-500 cursor-pointer" size={20}></FaCopy>
                                        }
                                    </p>
                                </div>

                            </div>
                            <hr className="border-gray-200 border-2" />
                            <div className="border-l-4 flex items-center gap-5 border-red-600 pl-2 space-y-2">
                                <p><MdOutlineNumbers size={25}></MdOutlineNumbers></p>

                                <div>
                                    <p className="font-semibold text-xl">Serial number :</p>
                                    <p className="flex items-center gap-5">{requestDetails?.serialNumber}
                                        {
                                            serialCopy ? <ImCheckmark onClick={handleSerialCopy} className='inline ml-2 text-green-500 cursor-pointer' size={20}></ImCheckmark> : <FaCopy
                                                onClick={handleSerialCopy}
                                                className="text-red-500 cursor-pointer" size={20}></FaCopy>
                                        }
                                    </p>
                                </div>
                            </div>
                            <hr className="border-gray-200 border-2" />
                            <div className="border-l-4 flex items-center gap-5 border-red-600 pl-2 space-y-2">
                                <p><MdDateRange size={25}></MdDateRange></p>

                                <div>
                                    <p className="font-semibold text-xl">Requested date :</p>
                                    <p className="flex items-center gap-5">{requestDetails?.requestedDate} </p>
                                </div>
                            </div>
                            <hr className="border-gray-200 border-2" />
                            <div className="border-l-4 flex items-center gap-5 border-red-600 pl-2 space-y-2">
                                <p><MdAccessTime size={25}></MdAccessTime></p>

                                <div>
                                    <p className="font-semibold text-xl">Requested time :</p>
                                    <p className="flex items-center gap-5">{requestDetails?.requestedTime} {requestDetails?.requestedTime >= 12 ? 'PM' : "AM"} </p>
                                </div>
                            </div>
                            <hr className="border-gray-200 border-2" />
                            <div className="border-l-4 flex items-center gap-5 border-red-600 pl-2 space-y-2">
                                <p><MdOutlinePhoneInTalk size={25}></MdOutlinePhoneInTalk></p>

                                <div>
                                    <p className="font-semibold text-xl">Requester Phone :</p>
                                    <p className="flex items-center gap-5">{requestDetails?.requesterPhone} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-10/12 mx-auto text-gray-600 space-y-4">


                        <p className="text-3xl font-bold">Requester Message</p>
                        <div className=" rounded-md bg-white">

                            <p className="p-4">{requestDetails?.requesterMessage}</p>
                        </div>

                    </div>
                </div> : <div className="w-full flex items-center justify-center mt-10">
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



        </div>
    );
};

export default MyRequestDetails;