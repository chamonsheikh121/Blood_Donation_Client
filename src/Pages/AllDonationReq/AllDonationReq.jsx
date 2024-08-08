import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import UseAllRequestCount from "../../Hooks/UseAllDonationRequest";
import RequestCard from "../../Components/Shared/RequestCard";
import { DNA } from "react-loader-spinner";
import Footer from "../HomePage/Footer";
import SectionComponent from "../../Components/SectionComponent/SectionComponent";


const AllDonationReq = () => {

    const [data, isLoad] = UseAllRequestCount();
    console.log(data);
    const [sliceData, setSliceData] = useState()
    const [currentPage, setCurrentPage] = useState(0);
    const [dataPerPage, setDataPerPage] = useState(8)
    const [pageCount, setPageCount] = useState()

    const array = [1, 2, 3];
    console.log(array.slice(0, 5));

    const count = data?.count;
    const pageArray = [...Array(pageCount).keys()];
    const handlePagination = (index) => {
        setCurrentPage(index)
        const newData = data?.data?.slice(dataPerPage * index, (dataPerPage * index) + dataPerPage);
        setSliceData(newData)
    }



    useEffect(() => {
        if (data?.data) {
            const initialData = data?.data?.slice(0, dataPerPage);
            setSliceData(initialData)
            setPageCount(Math.ceil(count && count / dataPerPage))
        }
    }, [dataPerPage, data?.data, count])

    if (isLoad) {
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
        <div >
            <div className="max-w-7xl pb-10 min-h-screen  text-gray-500 mx-auto mt-20" style={{ opacity: .1, transform: 'translateX(-90%)', transition: '1s' }} id="allData">
                <h1 className="text-center font-bold my-10 text-4xl">All Recent Request&apos;s</h1>
                <div className=" col-span-12 grid md:grid-cols-3  grid-cols-1 lg:grid-cols-4 gap-y-10 gap-x-5 p-5  ">

                    {
                        isLoad ? <div className="w-full flex items-center justify-center mt-10">
                            <DNA
                                visible={true}
                                height="100"
                                width="100"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                            />

                        </div> : sliceData?.length > 0 ? sliceData?.map(request => <RequestCard
                            key={request?._id}
                            requestType={data?.requestType}
                            request={request && request}
                        ></RequestCard>
                        ) : <div className="absolute flex  justify-center mt-10 w-full"><span
                            className="text-2xl font-extrabold"
                        >No Request found</span></div>
                    }


                </div>


                {
                    !isLoad && sliceData?.length > 0 && <div>
                        <div style={{ opacity: .1, transform: 'translateY(-90%)', transition: '1s' }} id="pagination" className="flex justify-center gap-5 items-center mt-5">
                            <button onClick={() => handlePagination(currentPage - 1)} className={`flex items-center justify-center gap-2 btn ${currentPage == 0 ? 'hidden' : ''}`}><FaArrowLeft></FaArrowLeft>  prev </button>
                            <div className="space-x-1">
                                {
                                    pageArray?.map((page, index) => <button onClick={() => handlePagination(index)} className={`btn  text-black ${currentPage == index ? 'bg-green-700 text-white hover:bg-green-800' : ''}`} key={index}>{index + 1}</button>)
                                }
                            </div>
                            <button onClick={() => handlePagination(currentPage + 1)} className={`flex items-center justify-center gap-2 btn ${pageArray?.length - 1 == currentPage ? 'hidden' : ''} `}> next <FaArrowRight></FaArrowRight></button>

                        </div>
                        <div style={{ opacity: .1, transform: 'translateX(-90%)', transition: '1s' }} id="pagePerCount" className="flex items-center justify-center mt-5">
                            <div className="border p-2 bg-gray-400 text-white">
                                <span>Request per Page :</span> <select defaultValue={8} className="text-black" onChange={(e) => setDataPerPage(parseInt(e.target.value))} name="" id="">
                                    <option value="6">6</option>
                                    <option value="9">9</option>
                                    <option value="12">12</option>
                                    <option defaultValue={8} value="8">8</option>
                                    <option value="12">12</option>
                                    <option value="16">16</option>
                                </select>
                            </div>
                        </div>
                    </div>

                }



            </div>
            <SectionComponent id={'allData'} from={'translateX'}></SectionComponent>
            {
                !isLoad && sliceData?.length > 0 && <SectionComponent id={'pagination'} from={'translateY'}></SectionComponent>
            }
            {!isLoad && sliceData?.length > 0 && <SectionComponent id={'pagePerCount'} from={'translateX'}></SectionComponent>}
            <Footer></Footer>
        </div>
    );
};

export default AllDonationReq;