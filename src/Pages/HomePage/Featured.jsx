import { FaHome } from "react-icons/fa";
import SectionComponent from "../../Components/SectionComponent/SectionComponent";



const Featured = () => {
    return (
        <div style={{opacity:.1, transform: 'translateX(-90%)', transition:'1s'}} className="bg-gray-200 featured" id="featuredContainer">

            <div className="max-w-7xl mx-auto py-20">
                <div className="flex flex-col sm:flex-row p-5 md:p-0 justify-between gap-10 items-center">
                    <div className="bg-white rounded-md ">
                        <div className="p-10 text-center space-y-2">
                            <FaHome className=" mx-auto text-red-700" size={40} ></FaHome>
                            <p className="text-xl font-semibold text-gray-500"><span>10</span> featured title</p>
                            <p>Start a brand new blood donation & campaign web site with in couple of hours using the pre build templates.</p>
                        </div>
                    </div>
                    <div className=" bg-white rounded-md">
                        <div className="p-10 text-center space-y-2">
                            <FaHome className=" mx-auto text-red-700" size={40} ></FaHome>
                            <p className="text-xl font-semibold text-gray-500"><span>10</span> featured title</p>
                            <p>Start a brand new blood donation & campaign web site with in couple of hours using the pre build templates.</p>
                        </div>
                    </div>
                    <div className=" bg-white rounded-md">
                        <div className="p-10 text-center space-y-2">
                            <FaHome className=" mx-auto text-red-700" size={40} ></FaHome>
                            <p className="text-xl font-semibold text-gray-500"><span>10</span> featured title</p>
                            <p>Start a brand new blood donation & campaign web site with in couple of hours using the pre build templates.</p>
                        </div>
                    </div>
                </div>
            </div>

            <SectionComponent id='featuredContainer' from={'translateX'}></SectionComponent>
        </div>
    );
};

export default Featured;