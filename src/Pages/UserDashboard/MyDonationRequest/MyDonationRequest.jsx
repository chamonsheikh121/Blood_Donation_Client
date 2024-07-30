
import { FaArrowRight, FaEdit } from "react-icons/fa";
import UseMyRequest from "../../../Hooks/UseMyRequest";
import img from './../../../assets/Login/29313294_pq6o_qij1_220606.jpg'


const MyDonationRequest = () => {
    const [data] = UseMyRequest()


    // _id,donarName,donarEmail,requesterName,requestedBloodGroup,requesterDivision,requesterDistrict,requesterUpazila,requesterHospital,requestedDate,requestedTime,requesterPhone,requesterFullAddress,requesterMessage,requesterImage,serialNumber



    return (
        <div>

            <div className="max-w-7xl border mx-auto ">
                {/* <h1 className="text-center font-bold text-4xl mb-5">My Request&apos;s</h1> */}
                <div className=" col-span-12 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10 p-5  ">
                    {
                        data?.map((request) => <div key={request?._id} className="border space-y-1 rounded-md border-gray-400 bg-gray-100 shadow-lg p-2">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <img src={img} className="w-[50px] h-[50px] rounded-full" alt="" />
                                    <div>
                                        <h4 className="text-xl font-bold">{request?.donarName}</h4>
                                        <p className="text-sm">{request?.donarEmail}</p>
                                    </div>
                                </div>
                                <span className="text-4xl text-red-600 font-bold">{request?.requestedBloodGroup}</span>
                            </div>
                            <div>
                                <img className="h-[220px] w-full rounded-md" src={request?.requesterImage} alt="" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold flex items-center gap-2">{request?.requesterName} <span className="text-sm">(requester name)</span></h4>
                                <p><span className="font-semibold">location :</span> {request?.requesterFullAddress}</p>
                                <p><span className="font-semibold">Estimate date & time :</span> {request?.requestedDate} , {request?.requestedTime}</p>
                            </div>
                            <div className="flex items-center  justify-between">
                                <button className="btn btn-sm mt-2 hover:bg-gray-500 hover:text-white  px-10 bg-gray-300">Edit <FaEdit></FaEdit></button>
                                <button className="btn btn-sm mt-2 flex items-center gap-2 hover:bg-red-500 hover:text-white  px-10 bg-red-300">See details <FaArrowRight></FaArrowRight></button>
                                

                            </div>
                        </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default MyDonationRequest;