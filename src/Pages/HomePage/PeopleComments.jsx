import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import UsePeopleComments from "../../Hooks/UsePeopleComments"
import { PiStarBold } from "react-icons/pi"
import { FaEdit } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import UseAuthContext from "../../Hooks/UseAuthContext"
import Swal from "sweetalert2"
import SectionComponent from "../../Components/SectionComponent/SectionComponent"
import { useEffect } from "react"

const PeopleComments = () => {
    const [peoplesComments, refetch] = UsePeopleComments()
    console.log(peoplesComments);
    const totalReview = 5;
    const { user } = UseAuthContext()
    const reviewArray = [...Array(totalReview).keys()];
    const navigate = useNavigate()
    const handleAdd = () => {
        if (!user) {
            Swal.fire('you have to login first')
            return;
        }
        navigate('/dashboard/add-review')
    }
    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 4,
            spacing: 15,

        },
        breakpoints: {
            "(max-width: 1024px)": {
                slides: {
                    perView: 2,
                    spacing: 10,
                },
            },
            "(max-width: 768px)": {
                slides: {
                    perView: 1,
                    spacing: 10,
                },
            },
            "(max-width: 480px)": {
                slides: {
                    perView: 1,
                    spacing: 5,
                },
            },
        }
    })
    useEffect(()=>{
        refetch()
    },[])
    return (
        <div id="peopleComments"
        style={{opacity:'.1', transition: '1s', transform:'translateX(-90%)'}}
        className="lg:my-28 my-20 max-w-7xl lg:px-0 md:px-10 px-2 mx-auto">
            <h1 className="text-3xl font-bold text-gray-600 text-center  mb-10"><span className="border-b-4 pb-4 border-gray-600 ">People Reviews</span></h1>
            <div className="flex justify-end my-2">
                <span onClick={handleAdd} className="flex items-center gap-2 px-5 py-2 bg-yellow-600 cursor-pointer text-gray-200"><FaEdit></FaEdit> Add review</span>
            </div>
            {
                peoplesComments?.length > 0 && <div ref={sliderRef} className="keen-slider  ">
                    {
                        peoplesComments?.length > 0 && peoplesComments?.map(peopleComment => <div
                            key={peopleComment?._id}
                            className="keen-slider__slide  number-slide2 space-y-5 bg-gradient-to-b from-red-700  to-purple-700   text-white p-5">
                            <div className="flex justify-center">
                                <img className="w-[100px] h-[100px] object-cover rounded-full" src={peopleComment?.image} alt="" />
                            </div>
                            <div className="flex flex-col  items-center space-y-5 justify-around ">
                                <div className="space-y-5">
                                    <h3 className="text-xl font-bold">{peopleComment?.name}</h3>
                                    <p className="max-w-72 text-center">{peopleComment?.review}</p>
                                </div>
                                <p className="flex text-3xl font-bold">{reviewArray?.map((review, index) =>
                                    <PiStarBold
                                        className={`${index + 1 <= peopleComment?.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                                        key={index}></PiStarBold>)}
                                </p>
                            </div>
                        </div>)
                    }

                </div>
            }
              <SectionComponent id={'peopleComments'} from={'translateX'}></SectionComponent>
        </div>
    )
}
export default PeopleComments;