import { Helmet } from "react-helmet";
import SectionComponent from "../../../Components/SectionComponent/SectionComponent";
import MyAcceptationsCard from "../../../Components/Shared/MyAcceptationsCard";
import UseMyAcceptation from "../../../Hooks/UseMyAcceptation";


const MyAcceptation = () => {

    const [myAcceptationData, isLoading] = UseMyAcceptation()

    return (
        <div className="max-w-5xl border mx-auto mt-10" id="my-acceptation-container" style={{ opacity: .1, transform: 'translateX(90%)', transition: '1s' }}>
                <Helmet>
                <title> Dashboard | My acceptations</title>
                </Helmet>
            
            <p className="text-4xl font-bold text-gray-700 p-10">My Accepted Requests</p>
            <div className="flex flex-col gap-5">
                {
                    isLoading ? <div className="absolute flex  justify-center mt-10 w-full">
                        <span className="loading loading-lg"></span>
                    </div> : myAcceptationData?.length > 0 ? myAcceptationData?.map((request) => <MyAcceptationsCard key={request?._id}
                        acceptationData={request}
                    ></MyAcceptationsCard>
                    ) : <div className="absolute flex  justify-center mt-10 w-full"><span
                        className="text-2xl font-extrabold"
                    >Not accepted yet</span></div>
                }
            </div>






            <SectionComponent id={'my-acceptation-container'} from={'translateX'}></SectionComponent>

        </div>
    );
};

export default MyAcceptation;