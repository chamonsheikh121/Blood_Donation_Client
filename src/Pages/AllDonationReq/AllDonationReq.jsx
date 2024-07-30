import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const AllDonationReq = () => {
    const data = 100;
    const dataArray = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, ...Array(data).join(1)];
    const dataPerPage = 12;
    const initialData = dataArray.slice(0, dataPerPage);
    const pageCount = Math.ceil(dataArray?.length / dataPerPage);
    const pageArray = [2, ...Array(pageCount + 1).join(1)];

    const [currentPage, setCurrentPage] = useState(0);
    const [sliceData, setSliceData] = useState(initialData)
    console.log(currentPage);

    const handlePagination = (index) => {
        setCurrentPage(index)

        const newData = dataArray.slice(dataPerPage * index, (dataPerPage * index) + dataPerPage);
        console.log(newData);
        setSliceData(newData)
    }






    return (
        <div>

            <div className="max-w-7xl border text-gray-500 mx-auto mt-20">
                <h1 className="text-center font-bold my-10 text-4xl">All Recent Request&apos;s</h1>
                <div className=" col-span-12 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-10 p-5  ">

                    {
                        sliceData?.map((ar, i) => <div key={i} className="bg-green-600 h-[200px] text-white flex justify-center items-center text-2xl">{i}</div>
                        )
                    }


                </div>
                <div className="flex justify-center gap-5 items-center mt-5">
                    <button onClick={() => handlePagination(currentPage - 1)} className="flex items-center justify-center gap-2 btn"><FaArrowLeft></FaArrowLeft>  prev </button>
                    <div className="space-x-1">
                        {
                            pageArray?.map((page, index) => <button onClick={() => handlePagination(index)} className={`btn  text-white ${currentPage == index ? 'bg-green-700 hover:bg-green-800' : 'bg-red-700 hover:bg-red-800'}`} key={index}>{index}</button>)
                        }
                    </div>
                    <button onClick={() => handlePagination(currentPage + 1)} className="flex items-center justify-center gap-2 btn"> next <FaArrowRight></FaArrowRight></button>
                </div>
            </div>

        </div>
    );
};

export default AllDonationReq;