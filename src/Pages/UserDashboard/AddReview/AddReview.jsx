import { useRef, useState } from "react";
import UseUser from "../../../Hooks/UseUser";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UsePeopleComments from "../../../Hooks/UsePeopleComments";
import { PiStarBold } from "react-icons/pi";
import { Helmet } from "react-helmet";

const AddReview = () => {
    const [myData] = UseUser();
    const [loading, setLoading] = useState(false)
    const ReviewInput = useRef();

    const [myReviews, refetch, isLoading] = UsePeopleComments(myData?.donarEmail)
    const [reviewValue, setReviewValue] = useState();

    const axiosPublic = UseAxiosPublic()
    const navigate = useNavigate()
    const totalReview = 5;
    const reviewArray = [...Array(totalReview).keys()];

    const handleReview = async () => {
        if (!reviewValue) {
            Swal.fire('please select rating');
            return;
        }
        if (!ReviewInput.current.value) {
            Swal.fire('review description can not be empty');
            return;
        }
        setLoading(true)
        const doc = {
            name: myData?.donarName,
            email: myData?.donarEmail,
            image: myData?.donarImage,
            review: ReviewInput.current.value,
            rating: reviewValue
        }

        const res = await axiosPublic.post('/api/v1/post-review', doc)
        const data = res.data;
        console.log(data);
        if (data?.acknowledged === true) {
            setLoading(false)
            refetch()
            ReviewInput.current.value = ''
            Swal.fire({
                title: "Review added successfully",
                icon: "success",
                text: 'Thanks for your review',
                showCancelButton: true,
                confirmButtonColor: "#b80505",
                cancelButtonColor: "#6632d0",
                cancelButtonText: 'cancel',
                confirmButtonText: "See now"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    navigate('/')
                }


            });
        }
        else {
            Swal.fire('something went wrong\nPlease try again');
            setLoading(false)
            return;
        }
    }


    return (
        <div className="mt-10">

            <Helmet>
                <title>Dashboard | review</title>
            </Helmet>
            <div className="bg-white space-y-10 p-5 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-5">
                    <div className="w-full">
                        <label htmlFor="send-userName" className="text-sm block mb-2">Name : </label>
                        <input
                            id="send-userName"
                            type="text"
                            defaultValue={myData?.donarName}
                            disabled
                            className="input text-xs input-bordered input-success w-full " />
                    </div>
                    <div className="w-full">
                        <label htmlFor="rating" className="text-sm  block mb-2">Rating : </label>
                        <select onChange={(e) => setReviewValue(parseInt(e.target.value))} id="rating" className="select focus:outline-none select-success w-full ">
                            <option disabled selected>Select</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>

                        </select>
                    </div>

                </div>

                <div>
                    <textarea
                        className="w-full  max-h-40 p-5 border rounded-md focus:outline-green-600 border-green-600"
                        name="message"
                        ref={ReviewInput}
                        placeholder={reviewValue ? `Explain here why you rating ${reviewValue}`:`Review here`}
                    ></textarea>
                </div>
                <div>
                </div>
                <div >
                    <div className="flex items-center justify-center">
                        <button onClick={handleReview} className="btn bg-green-700 hover:bg-green-800 text-white max-w-72  w-full">
                            {loading ? <span className="loading"></span> : 'Publish review'}</button>
                    </div>
                </div>

            </div>

            <h1 className=" font-bold text-gray-600 text-3xl m-10">My reviews</h1>
            <div className="max-w-4xl space-y-10 mx-auto">
                {
                    isLoading ? <div className="w-full mt-5 flex justify-center items-center"><span className="loading loading-lg"></span></div> : myReviews?.length > 0 ? myReviews?.map(review => <div
                        className="space-y-5"
                        key={review?._id}>
                        <div className='flex items-center  gap-10'>
                            <p className="flex text-3xl font-bold">{reviewArray?.map((reviews, index) =>
                                <PiStarBold
                                    className={`${index + 1 <= review?.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                                    key={index}></PiStarBold>)}
                            </p>

                        </div>
                        <p className='pl-10 py-2'>{review?.review}</p>
                    </div>
                    ) : <div className="w-full mt-5 flex justify-center items-center text-xl text-center font-bold"><span>Did not review yet</span></div>
                }

            </div>
        </div>
    );
};

export default AddReview;