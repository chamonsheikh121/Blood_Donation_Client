import { Link } from "react-router-dom";
import './Banner.css'
import UseAuthContext from "../../Hooks/UseAuthContext";
import SectionComponent from "../SectionComponent/SectionComponent";


const Banner = () => {
    const { user } = UseAuthContext()
    return (
        <div className="">
            <div className=" bannar bg-black  text-white md:py-80 py-40">
                <div className="max-w-4xl space-y-6 md:px-10 px-5 lg:px-0 mx-auto text-center">
                    <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold"
                    style={{ opacity: .1, transform: 'translateX(-90%)', transition: '1s' }} id="bannerHeading"
                    >The Ultimate Blood Donation Activism & Campaign HTML5 Template</h1>
                    <p className="text-gray-300"
                    style={{ opacity: .1, transform: 'translateX(90%)', transition: '1s' }} id="bannerBio"
                    >Blood Donation is a modern looking responsive HTML5 template specially designed & developed for Blood donation activism and Campaign in mind.<span className="md:hidden">....</span> <span className="hidden md:inline"> It is perfectly functional and ideal for Blood donation activism and Campaign Center websites . All elements necessary to make a unique and creative Blood donation activism and Campaign Center site are available here.</span> </p>
                    <div
                    style={{ opacity: .1, transform: 'translateY(-90%)', transition: '1s', transitionDelay:'.5s' }} id="bannerButtons"
                    className="flex flex-col w-full justify-start md:justify-center md:flex-row  md:w-full pl-5 md:pl-0 gap-5 ">
                        {
                            user ? null : <Link to='/registration' className=" rounded-md bg-red-700 text-white font-bold uppercase py-4 border-2 px-20 hover:bg-white hover:text-red-700 border-red-700">Join&nbsp;as  a&nbsp;donar</Link>
                        }
                        <button className=" rounded-md text-white hover:bg-white hover:text-black font-bold uppercase py-4 border-2 px-20">Search&nbsp;donar</button>
                    </div>
                </div>
            </div>
            <SectionComponent id={'bannerHeading'} from={'translateX'}></SectionComponent>
            <SectionComponent id={'bannerBio'} from={'translateX'}></SectionComponent>
            <SectionComponent id={'bannerButtons'} from={'translateY'}></SectionComponent>

        </div>
    );
};

export default Banner;