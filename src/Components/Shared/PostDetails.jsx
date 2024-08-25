import { AiFillLike, AiOutlineLike, AiOutlineMessage } from "react-icons/ai";
import { ImEye } from "react-icons/im";
import { PropTypes } from 'prop-types';
import { RiArrowDownFill, RiArrowRightSFill } from "react-icons/ri";
import UseAuthContext from "../../Hooks/UseAuthContext";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import { useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseUser from "../../Hooks/UseUser";
import { UseDateConverter } from "../../Hooks/UseDateConverter";



const PostDetails = ({ post }) => {
    const axiosPublic = UseAxiosPublic()
    const [instantMyLikeCount, setInstantMyLikeCount] = useState()
    const { user } = UseAuthContext();
    const [myData] = UseUser()
    const [showCommentSend, setShowCommentSend] = useState(false)
    const [showComment, setShowComment] = useState(false);
    const [inputDefault, setInputDefault] = useState('')
    const commentInputValue = useRef()
    const [commentCount, setCommentCount] = useState()
    const [newComment, setNewComment] = useState()
    const location = useLocation()
    const navigate = useNavigate()
    const [instantMyLike, setInstantMyLike] = useState(false)
    const handleCommentClick = async (id) => {
        if(myData?.status == 'blocked'){
            Swal.fire("You are blocked by admin ,\nPlease contact any volunteer")
            return;
        }
        if (!user) {
            Swal.fire({
                title: "Want to login ?",
                text: "To accept any request you have to login first !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login",
                cancelButtonText: "Letter"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    navigate('/login', { status: location?.pathname })
                }
            })
            return
        }
        if (!commentInputValue?.current?.value) {
            Swal.fire('can not comment empty')
            return
        }
        console.log(id);
        const dateCons = new Date();
        const date = UseDateConverter(dateCons);
        const time = dateCons.toLocaleString('en-US', { minute: '2-digit', hour: '2-digit' })
        const commentObject = {
            blogID: id,
            commenterName: myData?.donarName,
            commenterEmail: myData?.donarEmail,
            commenterImage: myData?.donarImage,
            comment: commentInputValue?.current?.value,
            date: date,
            time: time

        }
        const res = await axiosPublic.post('/api/v1/post-comment', commentObject)
        const data = res.data;
        if (data) {
            setNewComment(data.comments[0])
            setCommentCount(post?.comments.length + 1)
            console.log(data);
            Swal.fire('commented')
            setInputDefault('')
        }
    }

    const handleLike = async (id) => {
        if (!user) {
            Swal.fire('sorry, you have to login first')
            return
        }
        setInstantMyLikeCount(post?.likers?.length > 0 ? post?.likers?.length + 1 : 1)
        setInstantMyLike(true);
        console.log(id);
        await axiosPublic.patch(`/api/v1/likeCount/?id=${id}&email=${user?.email}`)
            .then(res => console.log(res.data))

    }




    return (
        <div>
            <div className="flex items-center w-full  justify-evenly">
                <p className="flex items-center gap-2 text-xl"><ImEye size={30}></ImEye><p>{post?.impressionCount}</p></p>
                <p className="flex items-center gap-2 text-xl cursor-pointer">
                    {
                        post?.likers?.some(liker => liker == user?.email) ? <AiFillLike className="text-blue-600" size={30}></AiFillLike> : instantMyLike ? <AiFillLike className="text-blue-600" size={30}></AiFillLike> : <AiOutlineLike onClick={() => handleLike(post?._id)} size={30}></AiOutlineLike>
                    }

                    <p>{instantMyLikeCount ? instantMyLikeCount : post?.likers?.length}</p>
                </p>
                <p onClick={() => setShowComment(!showComment)} className="flex items-center gap-2 text-xl cursor-pointer"><AiOutlineMessage size={30}></AiOutlineMessage><p></p>
                    <span>{commentCount ? commentCount : post?.comments?.length}</span>
                    {
                        showComment ? <RiArrowDownFill></RiArrowDownFill> : <RiArrowRightSFill></RiArrowRightSFill>
                    }
                </p>
            </div>
            {
                showComment ? <div>
                    <div className="w-full  mt-5">
                        <p className="text-xl font-bold mb-5">Comments :</p>
                        <div className="h-80 overflow-auto">


                            {
                                post?.comments?.length > 0 ? post?.comments?.map((comment, index) => <div
                                    key={index}
                                    className="flex w-fit gap-2 items-start">
                                    <img className="w-[50px] h-[50px] rounded-full object-cover" src={comment?.commenterImage} alt="" />
                                    <div className="bg-gray-300 mt-2 p-2 flex-1 space-y-2 rounded-md ">
                                        <Link to={`/search-donar/?email=${comment?.commenterEmail}`}><p className="font-bold cursor-pointer underline underline-offset-4">{comment?.commenterName}</p></Link>
                                        <pre>{comment?.comment}
                                        </pre>
                                    </div>
                                </div>) : <h1>no comments found</h1>
                            }
                            {
                                newComment && <div

                                    className="flex w-fit gap-2 items-start">
                                    <img className="w-[50px] h-[50px] rounded-full object-cover" src={newComment?.commenterImage} alt="" />
                                    <div className="bg-gray-300 mt-2 p-2 flex-1 space-y-2 rounded-md ">


                                        <Link to={`/search-donar/?email=${newComment?.commenterEmail}`}><p className="font-bold cursor-pointer underline underline-offset-4">{newComment?.commenterName}</p></Link>
                                        <pre>{newComment?.comment}
                                        </pre>
                                    </div>
                                </div>
                            }


                        </div>
                    </div>
                    <div className="space-y-2 relative  border-gray-300 p-2 pb-4 rounded-md mt-5">
                        <p className="font-bold">Comment now:</p>
                        <div>
                            <textarea
                                ref={commentInputValue}
                                onKeyUp={() => setShowCommentSend(true)}
                                placeholder="Comment here"
                                defaultValue={inputDefault}
                                className="w-full border py-[7px] rounded-md focus:outline-gray-300 pl-2" name="" id=""></textarea>
                            {
                                showCommentSend && <span title="comment" className="absolute bottom-2 p-2 bg-white rounded-full text-blue-700 cursor-pointer  right-1"><IoMdSend
                                    onClick={() => handleCommentClick(post?._id)}
                                    size={30} className=""></IoMdSend></span>
                            }

                        </div>
                    </div>
                </div> : <div className="space-y-2 relative  border-gray-300 p-2 pb-4 rounded-md mt-5">
                    <p className="font-bold">Comment now:</p>
                    <div>
                        <textarea
                            onClick={()=>setShowComment(true)}
                            placeholder="Comment here"
                            ref={commentInputValue}
                            defaultValue={inputDefault}
                            className="w-full border py-[7px] rounded-md focus:outline-gray-300 pl-2" name="" id=""></textarea>
                        {
                            showCommentSend && <span title="comment" className="absolute bottom-2 p-2 bg-white rounded-full text-blue-700 cursor-pointer  right-1"><IoMdSend onClick={() => handleCommentClick(post?._id)} size={30} className=""></IoMdSend></span>
                        }

                    </div>
                </div>
            }

        </div>
    );
};

export default PostDetails;
PostDetails.propTypes = {
    post: PropTypes.object
}