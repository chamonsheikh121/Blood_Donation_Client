import { Link } from "react-router-dom";
import UseAllRequestCount from "../../../../Hooks/UseAllDonationRequest";
import UsePendingRequest from "../../../../Hooks/UsePendingRequest";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import UseUser from './../../../../Hooks/UseUser';
import { Helmet } from "react-helmet";


const ManageRequests = () => {
    const [requests, isLoading, refetchActive] = UseAllRequestCount();
    const [pendingRequest, isLoad, refetchPending] = UsePendingRequest()
    const axiosSecure = UseAxiosSecure();
    const [userData] = UseUser()



    const handleApproveDisapprove = async (id) => {

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

                }

            })
    }

    const handleRequestDelete = (id) => {
        Swal.fire({
            title: "Are you sure ?",
            text: " do you want to delete this request !",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d30000",
            cancelButtonColor: "#838383",
            confirmButtonText: "delete",
            cancelButtonText: "cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
               
                await axiosSecure.delete(`/app/v1/delete-request/?id=${id}`)
                    .then(result => {
                        console.log(result);
                        if (result) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: " deleted successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetchActive()
                            refetchPending()
                           
                        }
                    })
               
            }

        })
    }

    return (
        <div className="m-10">
            <Helmet>
                <title>Dashboard | manage-request</title>
            </Helmet>
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

                                    <span className="text-xl font-bold">Request from :</span>
                                    <div className='flex items-end flex-row gap-10'>
                                        <div className='flex items-start gap-2'>
                                            <img className='w-[50px] h-[50px] rounded-full' src={request?.donarImage} alt="" />
                                            <div>
                                                <h6 className='text-xl text-gray-500 font-bold '>{request?.donarName}</h6>
                                                <p className='text-sm text-gray-500'>{request?.donarEmail}</p>
                                            </div>

                                        </div>
                                        <Link to={`/search-donar/?email=${request?.donarEmail}`}><button className='px-4 bg-blue-700 hover:bg-blue-800 text-white   btn btn-sm'> requester details</button></Link>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center gap-2'>

                                <Link className="" to={`/search-request/${request?._id}`}><button className='px-10 text-black w-full  btn btn-sm'>See details</button></Link>

                                {
                                    userData?.userRole == 'admin' && <button onClick={() => handleRequestDelete(request?._id)} className='px-10 text-black w-full  btn btn-sm'>delete</button>
                                }

                                <button onClick={() => handleApproveDisapprove(request?._id)} className={` ${request?.status == 'pending' ? 'bg-red-600 hover:bg-red-700 ' : 'bg-blue-700 hover:bg-blue-900'} px-10  text-white btn btn-sm`}>{request?.status == 'pending' ? 'Approve now' : 'make pending'}</button>



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
                                    <span className="text-xl font-bold">Request from :</span>
                                    <div className='flex items-end flex-row gap-10'>
                                        <div className='flex items-start gap-2'>
                                            <img className='w-[50px] h-[50px] rounded-full' src={request?.donarImage} alt="" />
                                            <div>
                                                <h6 className='text-xl text-gray-500 font-bold '>{request?.donarName}</h6>
                                                <p className='text-sm text-gray-500'>{request?.donarEmail}</p>
                                            </div>

                                        </div>
                                        <Link to={`/search-donar/?email=${request?.donarEmail}`}><button className='px-4 bg-blue-700 hover:bg-blue-800 text-white   btn btn-sm'> requester details</button></Link>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center gap-2'>

                                <Link className="" to={`/search-request/${request?._id}`}><button className='px-10 text-black w-full  btn btn-sm'>See details</button></Link>

                                {
                                    userData?.userRole == 'admin' && <button onClick={() => handleRequestDelete(request?._id)} className='px-10 text-black w-full  btn btn-sm'>delete</button>
                                }

                                <button onClick={() => handleApproveDisapprove(request?._id)} className={` ${request?.status == 'pending' ? 'bg-red-600 hover:bg-red-700 ' : 'bg-blue-700 hover:bg-blue-900'} px-10  text-white btn btn-sm`}>{request?.status == 'pending' ? 'Approve now' : 'make pending'}</button>

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