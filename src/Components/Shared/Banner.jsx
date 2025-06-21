import { Link } from "react-router-dom";
import './Banner.css';
import { useState } from "react";

const Banner = () => {
    const [showText, setShowText] = useState(false);

    return (
        <div className="">
            <div className="bannar bg-black text-white relative md:py-80 py-40">
                
                {/* Black overlay */}
                <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

                <div className="relative z-10">
                    <div className="max-w-4xl space-y-6 md:px-10 px-5 lg:px-0 mx-auto text-center">
                        <h1 className="lg:text-5xl text-gray-200 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] md:text-4xl text-3xl font-bold"
                            id="bannerHeading"
                        >
                            Discover, Read, and Grow – Your Library Journey Starts Here
                        </h1>
                        <p className="text-gray-300" id="bannerBio">
                            Libraries open the door to endless knowledge and imagination. From academic resources to best-selling novels, everything is at your fingertips.
                            <span className={`${showText ? 'hidden' : 'inline'} cursor-pointer`} onClick={() => setShowText(!showText)}>...more</span>
                            <span className={`${showText ? 'inline' : 'hidden'}`}>
                                Whether re a student, researcher, or casual reader, our library helps you access, borrow, and explore with ease. Enjoy a digital reading experience and stay updated with the latest arrivals. <span onClick={() => setShowText(!showText)} className="underline  cursor-pointer">show less</span>
                            </span>
                        </p>
                        <div id="bannerButtons">
                            <div className="flex flex-col w-full justify-start md:justify-center md:flex-row md:w-full md:pl-0 gap-5">
                                <Link to='/login' className="rounded-md text-xs md:text-[16px] transition-all bg-green-700 text-white font-bold uppercase py-4 border-2 px-20 hover:bg-white hover:text-green-700 border-green-700">
                                    Get started
                                </Link>
                                {/* <Link to='/my-borrowings' className="rounded-md text-xs md:text-[16px] transition-all hover:bg-green-700 hover:text-white font-bold uppercase py-4 border-2 px-20 bg-white text-green-700 border-green-700">
                                    My Borrowings
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Banner;
