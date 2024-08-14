import UseMyRequest from "../../../Hooks/UseMyRequest";
import { DNA } from "react-loader-spinner";
import RequestCard from "../../../Components/Shared/RequestCard";
import useAccepterDetails from "./../../../Hooks/UseAccepterDetails";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import { useEffect, useState } from "react";
import SectionComponent from "../../../Components/SectionComponent/SectionComponent";
import { Helmet } from "react-helmet";



const MyDonationRequest = () => {
    const [myRequest, , isLoading] = UseMyRequest()
    const axiosPublic = UseAxiosPublic()
    const [accepterData, isLoad, refetch] = useAccepterDetails();
    const [remainingRequest, setRemainingRequest] = useState()
    console.log(accepterData);




    const handleFullFill = (id) => {
        Swal.fire({
            title: "Donation Completed ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Full Fill"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosPublic.patch(`/api/v1/acceptedRequests/${id}`)
                const data = res.data;
                console.log(data);
                refetch()
                Swal.fire({
                    title: "Full Filled",
                    text: "Your blood donation Request had been full filled",
                    icon: "success"
                });
            }
        });
    }




    // const obj = data?.requestedTime;

    useEffect(() => {
        if (myRequest) {
            const filter = myRequest?.filter(request => request?.status != 'accepted');
            setRemainingRequest(filter)
        }
    }, [myRequest])


    if (isLoading) {
        return <div className='w-full flex items-center justify-center mt-20'><DNA
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
        /></div>
    }

    return (
        <div>
            <Helmet>
                <title> Dashboard | my request</title>
            </Helmet>
            <div id="AcceptedRequest" style={{ opacity: '0.1', transform: 'translateX(90%)', transition: '1s' }} className="max-w-5xl border mx-auto m-10">
                <h1 className=" text-gray-600 font-bold text-3xl mb-5">Not accepted</h1>
                <div className=" relative col-span-12 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10 p-5  ">
                    {
                        isLoading ? <div className="absolute flex  justify-center mt-10 w-full">
                            <span className="loading loading-lg"></span></div> : remainingRequest?.length > 0 ? remainingRequest?.map((request) => <RequestCard
                                key={request?._id}
                                request={request && request}
                            ></RequestCard>
                            ) : <div className="absolute flex  justify-center mt-10 w-full"><span
                                className="text-2xl font-extrabold"
                            >No pending request yet</span></div>
                    }

                </div>
            </div>

            <div id="AcceptedContainer" style={{ opacity: '.1', transform: 'translateX(-90%)', transition: '1s' }} className="max-w-5xl border mx-auto m-10">
                <h1 className=" text-gray-600 font-bold text-3xl mb-5">Accepted</h1>
                <div className=" space-y-5">
                    {
                        isLoad ? <div className="absolute flex  justify-center mt-10 w-full">
                            <span className="loading loading-lg"></span></div> : accepterData?.length > 0 ? accepterData?.map(details => <div
                                key={details?._id}
                                className={`flex ${details?.status == 'fullFilled' ? 'bg-green-100 border border-black' : 'bg-red-200'}   p-5 rounded-md items-center justify-between`}>

                                <div className='flex-1 flex items-center   gap-5'>
                                    <div className='w-[200px] h-[150px]'>
                                        <img className='w-full h-full object-cover rounded-md' src={details?.requesterImage} alt="" />
                                    </div>
                                    <div className="space-y-4">
                                        <span className="text-2xl font-bold text-gray-600"> Agreed to donate</span>
                                        <div className='flex items-center gap-10'>
                                            <div className='flex items-start gap-2'>
                                                <img className='w-[50px] h-[50px] rounded-full' src={details?.acceptedUserDetails?.accepterImage} alt="" />
                                                <div>
                                                    <h6 className='text-xl text-gray-500 font-bold '>{details?.acceptedUserDetails?.accepterName}</h6>
                                                    <p className='text-sm text-gray-500'>{details?.acceptedUserDetails?.accepterEmail}</p>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center gap-2'>
                                    {
                                        details?.status == 'fullFilled' ||
                                        <button className='px-10 text-black  btn'>See details</button>}

                                    {
                                        details?.status == 'fullFilled' ? <div className="tooltip tooltip-close tooltip-top" data-tip="Completed Donation">
                                            <p className={`bg-green-700 px-10 w-full  py-3 cursor-pointer rounded-md  text-white text-sm`}>Full filled</p>
                                        </div> :
                                            <div className="tooltip tooltip-close tooltip-top" data-tip="After Completing donation">
                                                <p onClick={() => handleFullFill(details?.requestedId)} className='px-10  hover:bg-red-700 bg-red-500 py-3 cursor-pointer rounded-md btn text-white text-sm'>Full fill now</p>
                                            </div>
                                    }
                                    {
                                        details?.status == 'fullFilled' ||
                                        <button className='px-10 bg-blue-700 hover:bg-blue-900 text-white btn'>call now</button>
                                    }
                                </div>


                            </div>) : <div className=" flex  justify-center mt-10 w-full"><span
                                className="text-2xl font-extrabold"
                            >Not accepted yet</span></div>
                    }
                </div>
            </div>

            <SectionComponent id={'AcceptedRequest'} from={'translateX'}></SectionComponent>
            <SectionComponent id={'AcceptedContainer'} from={'translateX'}></SectionComponent>

        </div>
    );
};

export default MyDonationRequest;