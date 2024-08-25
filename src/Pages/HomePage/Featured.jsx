
import SectionComponent from "../../Components/SectionComponent/SectionComponent";
import { BiSolidDonateHeart } from "react-icons/bi";
import { GiStrong } from "react-icons/gi";
import { TbSocial } from "react-icons/tb";



const Featured = () => {
    return (
        <div style={{opacity:.1, transform: 'translateX(-90%)', transition:'1s'}} className="bg-gray-200 featured" id="featuredContainer">

            <div className="max-w-7xl mx-auto py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:p-10 p-1  gap-10 ">
                    <div className="bg-white rounded-md ">
                        <div className="p-10 text-center space-y-2">
                            <BiSolidDonateHeart className=" mx-auto text-red-700" size={40} ></BiSolidDonateHeart>
                            <p className="text-xl font-semibold text-gray-500"> Life-Saving Impact</p>
                            <p>Blood donation is a vital process that directly saves lives. Donated blood is used in a variety of medical situations, including surgeries, trauma care, cancer treatment, and for patients with blood disorders. A single donation can potentially save multiple lives.</p>
                        </div>
                    </div>
                    <div className=" bg-white rounded-md">
                        <div className="p-10 text-center space-y-2">
                            <GiStrong  className=" mx-auto text-red-700" size={40} ></GiStrong >
                            <p className="text-xl font-semibold text-gray-500">Health Benefits for Donors</p>
                            <p>Regular blood donation has health benefits for the donor as well. It can help in maintaining healthy iron levels, reduce the risk of heart disease, and improve overall cardiovascular health. Donating blood also provides a mini health check-up, as donors are screened for certain health conditions.</p>
                        </div>
                    </div>
                    <div className=" bg-white rounded-md">
                        <div className="p-10 text-center space-y-2">
                            <TbSocial className=" mx-auto text-red-700" size={40} ></TbSocial>
                            <p className="text-xl font-semibold text-gray-500">Community Contribution</p>
                            <p>Blood donation is a meaningful way to give back to the community. It fosters a sense of solidarity and support, ensuring that blood is available when someone in the community needs it most. By donating blood, you become part of a network of individuals committed to the well-being of others.</p>
                        </div>
                    </div>
                </div>
            </div>

            <SectionComponent id='featuredContainer' from={'translateX'}></SectionComponent>
        </div>
    );
};

export default Featured;