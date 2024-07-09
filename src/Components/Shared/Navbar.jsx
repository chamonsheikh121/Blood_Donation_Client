import logo from "./../../assets/Screenshot_1.png"
import './Navbar.css'

const Navbar = () => {
    return (
        <div>
            <div className="max-w-7xl mx-auto ">
                <div className="flex  sm:flex-row items-center justify-around lg:justify-between">
                    <div className="lg:flex-1">
                        <img className="w-3/4 sm:w-auto" src={logo} alt="" />
                    </div>
                    <div className="lg:block hidden">
                        <ul className="flex flex-1  mr-5  items-center justify-between gap-3">
                            <li className="px-5  font-bold uppercase py-2 border-b-red-600 border-b-4">Home</li>
                            <li className="px-5  font-bold uppercase py-2 border-b-red-600 border-b-4"> donation&nbsp;req</li>
                            <li className="px-5  font-bold uppercase py-2 border-b-red-600 border-b-4">dashboard</li>
                            <li className="px-5  font-bold uppercase py-2 border-b-red-600 border-b-4">funding</li>
                            <li className=" rounded-md bg-red-700 text-white font-bold uppercase py-2 border-2 px-10">login</li>
                        </ul>
                    </div>
                    <div className="lg:hidden  border">arrow down</div>
                </div>
                <div className="hidden">
                    <ul className="cellNavbar   sm:w-2/4 h sm:mx-auto lg:hidden gap-2 flex flex-col mx-10">

                        <li className="px-5 hover:bg-gray-100  font-bold uppercase py-2 ">Home</li>
                        <li className="px-5 hover:bg-gray-100  font-bold uppercase py-2 "> donation&nbsp;req</li>
                        <li className="px-5 hover:bg-gray-100  font-bold uppercase py-2 ">dashboard</li>
                        <li className="px-5 hover:bg-gray-100  font-bold uppercase py-2 ">funding</li>
                        <li className="rounded-md bg-red-700 text-white font-bold uppercase py-2 border-2 pl-5">login</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;