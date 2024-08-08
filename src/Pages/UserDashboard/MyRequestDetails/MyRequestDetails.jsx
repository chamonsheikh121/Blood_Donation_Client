import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import { DNA } from "react-loader-spinner";
import { FaCopy, FaRegUser } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { CiHospital1 } from "react-icons/ci";
import { MdAccessTime, MdDateRange, MdOutlineNumbers, MdOutlinePhoneInTalk, MdOutlineQrCode2 } from "react-icons/md";
import { BiDonateBlood, BiSolidMapPin } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { LuClipboardEdit } from "react-icons/lu";
import SectionComponent from "../../../Components/SectionComponent/SectionComponent";
import UseAuthContext from "../../../Hooks/UseAuthContext";
import UseUser from './../../../Hooks/UseUser';
import Swal from "sweetalert2";
import { UseDateConverter } from './../../../Hooks/UseDateConverter';
import { UseTimeConverter } from "../../../Hooks/UseTimeConverter";



const MyRequestDetails = () => {
    const axiosPublic = UseAxiosPublic()
    const { user } = UseAuthContext();
    const [loading, setLoading] = useState(false)
    const [userData] = UseUser();
    const [refetch, setRefetch] = useState(false)
    const [requestDetails, setRequestDetails] = useState()
    console.log(requestDetails);
    const [serialCopy, setSerialCopy] = useState(false)
    const [requestedId, setRequestedId] = useState(false)
    const param = useParams();
    const Navigate = useNavigate()



    // ==================  converting date and time to full name ===================
    const dateConstructor = new Date(requestDetails?.requestedDate);
    const date = UseDateConverter(dateConstructor);
    // console.log(requestDetails?.requestedTime);
    if (requestDetails?.requestedTime) {
        var time = UseTimeConverter(requestDetails?.requestedTime)
    }


    // ====================================== ID and serial number copy =======================
    const handleSerialCopy = () => {
        navigator.clipboard.writeText(requestDetails?.serialNumber)
        setSerialCopy(true)
    }
    const handleRequestedId = () => {
        navigator.clipboard.writeText(requestDetails?._id)
        setRequestedId(true)
    }

    const location = useLocation();
    const isInDashboard = location?.pathname?.includes('dashboard');
    //  ================================ handle accepted ==========================================
    const handleAccepted = () => {
        let acceptedUserDetails = {
            accepterName: userData?.donarName,
            accepterEmail: userData?.donarEmail,
            accepterPhone: userData?.donarPhone,
            accepterImage: userData?.donarImage,
            accepterUID: userData?.userUID,

        }
        acceptedUserDetails = { ...requestDetails, acceptedUserDetails };
        acceptedUserDetails.requestedId = requestDetails?._id;
        acceptedUserDetails.status = 'notFullFilled';
        delete acceptedUserDetails?._id;
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to accept this Request !",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Accept"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true)
                const res = await axiosPublic.post('/api/v1/all-acceptedRequest', acceptedUserDetails)
                const data = res?.data;

                if (data?.acknowledged == true) {
                    setLoading(false)
                    setRefetch(!refetch)
                    Swal.fire({
                        title: "Request Accepted",
                        icon: "success",
                        showCancelButton: true,
                        cancelButtonText: "ok",
                        confirmButtonColor: "#713ae9",
                        cancelButtonColor: "#713ae9",
                        confirmButtonText: "see now"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Navigate(`/dashboard/my-acceptations`)
                        }
                    });
                }





            }
        });

    }
    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            if (param) {
                const res = await axiosPublic.get(`/api/v1/findOne/${param.id}`)
                const data = res.data;
                setLoading(false)
                return setRequestDetails(data)
            }
        }
        getData()
    }, [param, axiosPublic, refetch])

    return (
        <div className="mb-20" id="detailsPage" style={{ opacity: .1, transform: 'translateX(90%)', transition: '1s' }}>


            {
               loading ? <div className="w-full flex items-center justify-center mt-10">
               <DNA
                   visible={true}
                   height="100"
                   width="100"
                   ariaLabel="dna-loading"
                   wrapperStyle={{}}
                   wrapperClass="dna-wrapper"
               />
           </div> : requestDetails ? <div className="mt-2">
                    <div className="flex lg:flex-row flex-col justify-center items-center lg:items-start gap-10 p-2 ">
                        <div className={`bg-gradient-to-t from-gray-400 ${requestDetails?.status == 'accepted' ? 'bg-green-600' : 'to-purple-600'}  flex flex-col lg:flex-row  items-start lg:p-5 gap-2 justify-between w-10/12 rounded-md`}>
                            <div className="lg:h-[400px]  lg:w-[600px]">
                                <img className="h-full w-full " src={requestDetails?.requesterImage} />

                            </div>

                            <div className="flex flex-col h-[400px] flex-1 items-center lg:items-start p-2">
                                <div className="text-white flex-1   pb-5 lg:pb-0 space-y-5 text-start  ">
                                    <p className="text-2xl md:text-4xl font-bold">Requested from :</p>
                                    <div className="flex items-center gap-2">
                                        <img className={`h-[80px] w-[80px] p-2 ${requestDetails?.status == 'accepted' ? 'bg-green-700' : 'to-purple-700'} rounded-full`} src={requestDetails?.donarImage} alt="" />
                                        <div>
                                            <h3 className="text-xl  font-bold">{requestDetails?.donarName}</h3>
                                            <p className="font-semibold">{requestDetails?.donarEmail}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {

                                        isInDashboard ? <Link to={`/dashboard/my-donation-requests/${requestDetails?._id}/edit`}><button className="btn flex items-center gap-4 px-16 bg-white text-purple-700 hover:bg-purple-700 hover:text-white border-2 border-purple-700 font-semibold">Edit <LuClipboardEdit size={20}></LuClipboardEdit></button></Link> : <button onClick={handleAccepted} disabled={requestDetails?.donarEmail == user?.email || requestDetails?.status == 'accepted'} className={`btn ${requestDetails?.status == 'accepted' ? 'cursor-not-allowed' : ''} px-16 bg-white text-purple-700 hover:bg-purple-700 hover:text-white border-2 border-purple-700 font-semibold`}>{loading ? <span className="loading loading-ring text-purple-700"></span> : requestDetails?.status == 'accepted' ? 'Accepted' : 'Accept'}</button>
                                    }

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
                                    <p className="flex items-center gap-5">{date}</p>
                                </div>
                            </div>
                            <hr className="border-gray-200 border-2" />
                            <div className="border-l-4 flex items-center gap-5 border-red-600 pl-2 space-y-2">
                                <p><MdAccessTime size={25}></MdAccessTime></p>

                                <div>
                                    <p className="font-semibold text-xl">Requested time :</p>
                                    <p className="flex items-center gap-5">{time}</p>
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

                </div>

                    : <div className=" flex  justify-center mt-10 w-full"><span
                    className="text-2xl font-extrabold"
                >No Request found</span></div>
            }

            <SectionComponent id={'detailsPage'} from={'translateX'}></SectionComponent>

        </div>
    );
};

export default MyRequestDetails;