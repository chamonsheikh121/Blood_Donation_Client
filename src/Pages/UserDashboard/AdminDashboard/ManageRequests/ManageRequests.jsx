
import { Link } from "react-router-dom";
import UseAllRequestCount from "../../../../Hooks/UseAllDonationRequest";
import UsePendingRequest from "../../../../Hooks/UsePendingRequest";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";

const ManageRequests = () => {
    const [requests, isLoading, refetchActive] = UseAllRequestCount();
    const [pendingRequest, isLoad, refetchPending] = UsePendingRequest()
    const axiosSecure = UseAxiosSecure()
    const [loading, setLoading] = useState(false)


    const handleApproveDisapprove = async (id) => {
        setLoading(true)
        console.log(id);
        await axiosSecure.patch(`/api/v1/update-request-status/?id=${id}`)
            .then(result => {
                if (result?.data?.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: " updated successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetchActive()
                    refetchPending()
                    setLoading(false)
                }

            })
    }

    return (
        <div className="m-10">
            <h2 className="text-2xl font-bold mb-5">Total Request Found : {requests?.data?.length + pendingRequest?.length}</h2>
            <div>
                <div className="mb-5 space-y-5">
                    {
                        isLoad ? <div className='w-full flex justify-center items-center mt-5'><span className="loading loading-spinner loading-lg"></span></div> : pendingRequest?.length > 0 ? pendingRequest?.map(request => <div
                            key={request?._id}
                            className={`flex bg-white   p-5 rounded-md items-center justify-between`}>

                            <div className='flex-1 flex items-center   gap-5'>
                                <div className='w-[150px] h-[100px]'>
                                    <img className='w-full h-full object-cover rounded-md' src={request?.requesterImage} alt="" />
                                </div>
                                <div className="space-y-4">


                                </div>
                            </div>
                            <div className='flex flex-col justify-center gap-2'>

                                <Link className="" to={`/search-request/${request?._id}`}><button className='px-10 text-black w-full  btn'>See details</button></Link>
                                <button onClick={() => handleApproveDisapprove(request?._id)} className={` ${request?.status == 'pending' ? 'bg-red-600 hover:bg-red-700 ' : 'bg-blue-700 hover:bg-blue-900'} px-10  text-white btn`}>{request?.status == 'pending' ? 'Approve now' : 'make pending'}</button>



                            </div>

                        </div>) : <div className=" mb-10  w-full text-center mt-5 "><span
                            className="text-2xl font-extrabold"
                        >No pending request found</span></div>
                    }
                </div>
                <div className="space-y-5">
                    {
                        isLoading ? <div className='w-full flex justify-center items-center mt-5'><span className="loading loading-spinner loading-lg"></span></div> : requests?.data?.length > 0 ? requests?.data?.map(request => <div
                            key={request?._id}
                            className={`flex bg-white   p-5 rounded-md items-center justify-between`}>

                            <div className='flex-1 flex items-center   gap-5'>
                                <div className='w-[150px] h-[100px]'>
                                    <img className='w-full h-full object-cover rounded-md' src={request?.requesterImage} alt="" />
                                </div>
                                <div className="space-y-4">


                                </div>
                            </div>
                            <div className='flex flex-col justify-center gap-2'>

                                <Link className="" to={`/search-request/${request?._id}`}><button className='px-10 text-black w-full  btn'>See details</button></Link>


                                <button onClick={() => handleApproveDisapprove(request?._id)} className={` ${request?.status == 'pending' ? 'bg-red-600 hover:bg-red-700 ' : 'bg-blue-700 hover:bg-blue-900'} px-10  text-white btn`}>{request?.status == 'pending' ? 'Approve now' : 'make pending'}</button>

                            </div>

                        </div>) : <div className="  w-full text-center mt-5 "><span
                            className="text-2xl font-extrabold"
                        >Not request found</span></div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageRequests;