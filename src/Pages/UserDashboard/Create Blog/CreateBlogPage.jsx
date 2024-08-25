
import UseUser from "../../../Hooks/UseUser";
import { UseDateConverter } from "../../../Hooks/UseDateConverter";
import { useEffect, useState } from "react";
import SectionComponent from "../../../Components/SectionComponent/SectionComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import UsePost from "../../../Hooks/UsePost";
import UseAuthContext from "../../../Hooks/UseAuthContext";

import PostDetails from "../../../Components/Shared/PostDetails";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";


const CreateBlogPage = () => {
    const [PublishLoading, setPublishLoading] = useState(false)
    const [PreviewLoading, setPreviewLoading] = useState(false)
    const { user } = UseAuthContext()
    const navigate = useNavigate()
    const [myData] = UseUser()
    const axiosPublic= UseAxiosPublic()
    const [localData, setLocalData] = useState()
    const [myBlogs, isLoading, refetch] = UsePost(user?.email)


    console.log(myBlogs);

    const handleCreateBlog = async (e) => {
        e.preventDefault();
        setPublishLoading(true)
        const form = new FormData(e.currentTarget);
        const name = myData?.donarName;
        const date = new Date()
        const convertedDate = UseDateConverter(date)
        const time = date.toLocaleTimeString('en-US', { minute: '2-digit', hour: '2-digit' })
        const email = myData?.donarEmail;
        const messageTitle = form.get('messageTitle');
        const message = form.get('message');
        const color = form.get('color');
        console.log(color);
        const imgFile = form.get('thumbnail')
        if (imgFile?.name) {
            const img = { "image": imgFile }
            const key = 'f6a950227b2e6c0fda979d39facb73d8'
            const api = `https://api.imgbb.com/1/upload?key=${key}`
            const res = await axios.post(api, img, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            var inputThumbnail = res?.data?.data?.display_url;
        }
        var messageObject = {
            name: name,
            email: email,
            publisherImage: myData?.donarImage,
            blogTitle: messageTitle,
            description: message,
            date: convertedDate,
            time: time,
            impressionCount: 0,
            postedBy: myData?.userRole,
            thumbnail: inputThumbnail || localData?.thumbnail
        }
        console.log(messageObject);
        const mongodbRes = await axiosPublic.post('/api/v1/blogs', messageObject)
        const blogData = mongodbRes?.data;
        console.log(blogData);

        if (blogData?.acknowledged === true) {
            setPublishLoading(false)

            Swal.fire({
                title: "Blog published",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#b80505",
                cancelButtonColor: "#6632d0",
                cancelButtonText: 'cancel',
                confirmButtonText: "See now"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    navigate('/blogs')
                }
                e.target.reset()
                refetch()
                localStorage.removeItem('blogPreview')
                setLocalData('')
            });
        }

    }




    const handleThumbnailDelete = () => {
        localData.thumbnail = '';
        localStorage.setItem('blogPreview', JSON.stringify(localData))
        setLocalData(JSON.parse(localStorage.getItem('blogPreview')))
    }
    const handlePreview = async () => {
        setPreviewLoading(true)
        localStorage.removeItem('blogPreview')
        const formHtml = document.getElementById('blogForm');
        const form = new FormData(formHtml);
        const name = myData?.donarName;
        const date = new Date()
        const convertedDate = UseDateConverter(date)
        const time = date.toLocaleTimeString('en-US', { minute: '2-digit', hour: '2-digit' })
        const email = myData?.donarEmail;
        const messageTitle = form.get('messageTitle');
        const message = form.get('message');
        const imgFile = form.get('thumbnail');
        const img = { "image": imgFile }
        if (imgFile?.name) {
            const key = 'f6a950227b2e6c0fda979d39facb73d8'
            const api = `https://api.imgbb.com/1/upload?key=${key}`
            const res = await axios.post(api, img, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            var thumbnail = res?.data?.data?.display_url;
        }


        var messageObject = {
            name: name,
            email: email,
            publisherImage: myData?.donarImage,
            blogTitle: messageTitle,
            description: message,
            date: convertedDate,
            time: time,
            postedBy: myData?.userRole,
            thumbnail: thumbnail || localData?.thumbnail
        }
        localStorage.setItem('blogPreview', JSON.stringify(messageObject))
        navigate(`/dashboard/create-blog/preview`)
        setPreviewLoading(false)
    }

    const customFileButton = () => {
        document.getElementById('fileInput').click();
    }
    const fileInput = (e) => {
        const fileName = e.files[0] ? e.files[0].name : '';
        document.getElementById('fileName').textContent = fileName ? `Selected file: ${fileName}` : 'No file selected';
    }

    useEffect(() => {
        setLocalData(JSON.parse(localStorage.getItem('blogPreview')))
    }, [])
    return (
        <div>
            <form onSubmit={handleCreateBlog} id="blogForm" style={{ opacity: .1, transition: '1s', transform: 'translateX(90%)' }} className="bg-white space-y-10 p-5 max-w-4xl mx-auto">
                <div className="flex  items-center gap-5">
                    <div className="w-full">

                        <label htmlFor="send-userName" className="text-sm block mb-2">Name : </label>
                        <input
                            id="send-userName"
                            type="text"
                            defaultValue={myData?.donarName}
                            disabled
                            className="input input-bordered input-success w-full " />
                    </div>
                    <div className="w-full">
                        <label htmlFor="send-userEmail" className="text-sm block mb-2">Email : </label>
                        <input
                            id="send-userEmail"
                            type="text"
                            defaultValue={myData?.donarEmail}
                            disabled
                            className="input input-bordered input-success w-full " />
                    </div>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Blog title"
                        required
                        defaultValue={localData?.blogTitle}
                        name="messageTitle"
                        className="input input-bordered input-success w-full" />
                </div>
                <div>
                    <textarea
                        className="w-full  min-h-80 p-5 border rounded-md focus:outline-green-600 border-green-600"
                        name="message"
                        defaultValue={localData?.description}
                        placeholder="blog description"
                    ></textarea>
                </div>
                <div>

                    <div className="mt-2 flex flex-col gap-2">
                        <div className="flex">
                            {localData?.thumbnail ? <div className="relative">
                                <div className="flex items-center">
                                    <img className="h-[80px] relative 1-[100px]" src={localData?.thumbnail} alt="" />
                                    <p onClick={handleThumbnailDelete} className="text-red-600 text-sm cursor-pointer pl-2">remove</p>
                                </div>
                                <div className="absolute top-[50%] left-[50%]" style={{ transform: 'translate(-90%, -50%)' }}>
                                    <input onChange={(e) => fileInput(e.target)} type="file" id="fileInput" style={{ display: 'none' }} name="thumbnail" />
                                    <p onClick={customFileButton} id="customFileButton" className="cursor-pointer text-blue-800 underline font-bold bg-white rounded-md px-1 opacity-80">
                                        Change
                                    </p>

                                </div>
                                <span className="absolute block text-xs left-0 -right-10" id="fileName"></span>
                            </div>
                                : <div className="flex items-center gap-2">
                                    <span>Thumbnail :</span>
                                    <input type="file" name="thumbnail" id="file" />
                                </div>}


                        </div>


                    </div>
                </div>
                <div >
                    <div className="flex items-center justify-center">
                        <button className="btn bg-green-700 hover:bg-green-800 text-white max-w-72  w-full">
                            {PublishLoading ? <span className="loading"></span> : 'Publish blog'}</button>
                    </div>
                    <div className="flex items-center justify-end">
                        <p onClick={handlePreview} className="btn bg-green-700 hover:bg-green-800 text-white ">
                            {PreviewLoading ? <span className="loading"></span> : 'Preview'}</p>
                    </div>
                </div>

            </form>


            <div>
                <h1 className="ml-10 mt-20 mb-10 text-2xl font-bold">My Blogs :</h1>
                <div className="max-w-4xl mx-auto">
                    {
                        isLoading ? <div className=" flex  justify-center mt-10 w-full">
                            <span className="loading loading-lg"></span>
                        </div> : myBlogs?.length > 0 ? myBlogs?.map(myBlog => <div
                            key={myBlog?._id}
                            className=" p-5  flex flex-col-reverse">
                            <div className=" space-y-10">
                                <div className='space-y-5'>
                                    <div className={`h-[400px] ${myBlog?.thumbnail ? '' : `flex items-center justify-center bg-gradient-to-b from-purple-700 to-violet-700`}  red-700 w-full border relative`}>
                                        <div className='w-[60px] absolute top-2 left-2 p-1 flex items-center gap-5 bg-white rounded-full h-[60px]'>
                                            <img className='w-full object-cover rounded-full h-full' src={myBlog?.publisherImage} alt="" />
                                            <div className=''>
                                                <h1 className="text-xl  font-bold text-gray-200">{myBlog?.name}</h1>
                                                <p className='text-sm text-gray-400'>{myBlog?.email}</p>
                                            </div>
                                        </div>
                                        {
                                            !myBlog?.thumbnail && <h1 className="text-3xl font-bold text-white">{myBlog?.blogTitle}</h1>
                                        }
                                        {
                                            myBlog?.thumbnail && <img className="w-full h-full object-cover" src={myBlog?.thumbnail} alt="" />
                                        }
                                    </div>
                                    <h3 className='text-2xl pl-1 font-semibold'>{myBlog?.blogTitle}</h3>
                                    <p className='text-md'>{myBlog?.description}</p>
                                    <div className='font-semibold'>
                                        <p>Published date & time :</p>
                                        <span>{myBlog?.date} , {myBlog?.time}</span>
                                    </div>
                                </div>
                                <PostDetails post={myBlog}></PostDetails>
                                <hr className="border-gray-300" />
                            </div>
                        </div>) : <div className=" flex  justify-center mt-10 w-full"><span
                            className="text-2xl font-extrabold"
                        >You did not posted any blog</span></div>
                    }
                </div>
            </div>
            <SectionComponent id={'blogForm'} from={'translateX'}></SectionComponent>

        </div>
    );
};

export default CreateBlogPage;