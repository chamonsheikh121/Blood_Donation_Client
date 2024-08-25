import { Link } from "react-router-dom";
import './Banner.css'
import UseAuthContext from "../../Hooks/UseAuthContext";
import SectionComponent from "../SectionComponent/SectionComponent";
import { useState } from "react";


const Banner = () => {
    const { user } = UseAuthContext()
    const [showText, setShowText] =useState(false)
    return (
        <div className="">
            <div className=" bannar bg-black  text-white md:py-80 py-40">
                <div className="max-w-4xl space-y-6 md:px-10 px-5 lg:px-0 mx-auto text-center">
                    <h1 className="lg:text-5xl text-gray-200 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] md:text-4xl text-3xl font-bold"
                        style={{ opacity: .1, transform: 'translateX(-90%)', transition: '1s' }} id="bannerHeading"
                    >Donate Blood, Save Lives . Join the Blood Donation Movement Today</h1>
                    <p className="text-gray-300"
                        style={{ opacity: .1, transform: 'translateX(90%)', transition: '1s' }} id="bannerBio"
                    >Blood donation is crucial as it saves lives by providing essential blood to those in need, such as accident victims, surgical patients, and individuals with chronic illnesses. <span className={`${showText ? 'hidden':'inline'}`} onClick={()=>setShowText(!showText)}>...</span>  <span className={`${showText ? 'inline':'hidden'}`}>A single donation can help up to three people, making it an incredibly impactful act of kindness. Regular blood donations ensure a stable supply, preventing shortages in emergencies. Additionally, donating blood benefits the donor by promoting good health and well-being. <span onClick={()=>setShowText(!showText)} className="underline">show less</span></span> </p>
                    <div
                        style={{ opacity: .1, transform: 'translateY(-90%)', transition: '1s', transitionDelay: '.5s' }} id="bannerButtons">
                        {
                            user ? <div className="flex flex-col w-full justify-start md:justify-center md:flex-row  md:w-full  md:pl-0 gap-5 ">
                                <Link to='/search-donar' className=" rounded-md text-xs md:text-[16px] transition-all bg-red-700 text-white font-bold uppercase py-4 border-2 px-20 hover:bg-white hover:text-red-700 border-red-700">Search &nbsp;donar</Link>
                                <Link to='/search-request' className=" rounded-md text-xs md:text-[16px] transition-all hover:bg-red-700 hover:text-white font-bold uppercase py-4 border-2 px-20 bg-white text-red-700 border-red-700">Search Request</Link>
                            </div> : <div className="flex flex-col w-full justify-start md:justify-center md:flex-row  md:w-full  md:pl-0 gap-5 ">
                                <Link to='/registration' className=" rounded-md text-xs md:text-[16px] transition-all bg-red-700 text-white font-bold uppercase py-4 border-2 px-20 hover:bg-white hover:text-red-700 border-red-700">Join&nbsp;as&nbsp;a&nbsp;donar</Link>
                                <Link to='/search-request' className=" rounded-md text-xs md:text-[16px] transition-all bg-red-700 text-white font-bold uppercase py-4 border-2 px-20 hover:bg-white hover:text-red-700 border-red-700">Search&nbsp;&nbsp;request</Link>
                            </div>
                        }
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