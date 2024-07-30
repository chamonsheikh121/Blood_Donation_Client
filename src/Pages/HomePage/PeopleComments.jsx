
const PeopleComments = () => {


    return (
        <div className="max-w-7xl mx-auto my-10">

            <div id="carousel-inner" className={` bg-red-300 h-[300px] flex justify-center overflow-hidden items-center relative max-w-5xl mx-auto`}>
                <div id="carousel" className={`flex -translate-x-[100%] w-full items-center h-full`}>
                    <div className="flex w-full ">
                        <div className="min-w-full  bg-green-300 p-10 text-center">3</div>
                        <div className="min-w-full  bg-green-300 p-10 text-center">4</div>
                        <div className="min-w-full  bg-green-300 p-10 text-center">5</div>
                    </div>

                </div>
            </div>
            {/* <button onClick={nextSlide} className="btn">next</button>*/}
        </div>

    );
};

export default PeopleComments;