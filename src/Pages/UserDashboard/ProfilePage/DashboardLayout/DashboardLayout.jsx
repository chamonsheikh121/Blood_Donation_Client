import { Outlet } from "react-router-dom";


const DashboardLayout = () => {
    return (
        <div className="">
            {/* <div className="h-[40px] bg-red-700"></div> */}
            <div className="grid grid-cols-12">
                <div className="col-span-2 text-gray-200 bg-red-700 md:h-[650px] sticky top-[81px]">Lorem ipsum dolor sit amet .</div>
                <div className="col-span-10 text-gray-800 bg-gray-200 ">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;