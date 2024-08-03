import UseMyRequest from "../../../Hooks/UseMyRequest";
import { DNA } from "react-loader-spinner";
import RequestCard from "../../../Components/Shared/RequestCard";
// import UseAuthContext from "../../../Hooks/UseAuthContext";


const MyDonationRequest = () => {
    const [data, , isLoading] = UseMyRequest()



    // _id,donarName,donarEmail,requesterName,requestedBloodGroup,requesterDivision,requesterDistrict,requesterUpazila,requesterHospital,requestedDate,requestedTime,requesterPhone,requesterFullAddress,requesterMessage,requesterImage,serialNumber

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

    // const obj = data?.requestedTime;


    return (
        <div>

            <div className="max-w-7xl border mx-auto ">
                {/* <h1 className="text-center font-bold text-4xl mb-5">My Request&apos;s</h1> */}
                <div className=" col-span-12 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10 p-5  ">
                    {
                        data?.map((request) =><RequestCard 
                        key={request?._id}
                        request={request && request}
                        ></RequestCard>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default MyDonationRequest;