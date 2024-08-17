
import UseUser from "../../../Hooks/UseUser";
import { UseDateConverter } from "../../../Hooks/UseDateConverter";
import { useEffect, useState } from "react";
import SectionComponent from "../../../Components/SectionComponent/SectionComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";


const CreateBlogPage = () => {
    const [PublishLoading, setPublishLoading] = useState(false)
    const [PreviewLoading, setPreviewLoading] = useState(false)
    const navigate = useNavigate()
    const [myData] = UseUser()
    const axiosSecure = UseAxiosSecure()
    const [localData, setLocalData] = useState()


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
            thumbnail: inputThumbnail || localData?.thumbnail,
            bgColor: color
        }
        const mongodbRes = await axiosSecure.post('/api/v1/blogs', messageObject)
        const blogData = mongodbRes?.data;
        if (blogData?.acknowledge === true) {
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

            });
        }
        setPublishLoading(false)
    }
    const handleThumbnailDelete = () => {
        localData.thumbnail = '';
        localStorage.setItem('blogPreview', JSON.stringify(localData))
        setLocalData(JSON.parse(localStorage.getItem('blogPreview')))
    }
    const handlePreview = async () => {
        setPreviewLoading(true)
        const formHtml = document.getElementById('blogForm');
        const form = new FormData(formHtml);
        const name = myData?.donarName;
        const date = new Date()
        const convertedDate = UseDateConverter(date)
        const time = date.toLocaleTimeString('en-US', { minute: '2-digit', hour: '2-digit' })
        const email = myData?.donarEmail;
        const color = form.get('color');
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
            thumbnail: thumbnail || localData?.thumbnail,
            bgColor: color
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
            <form onSubmit={handleCreateBlog} id="blogForm" style={{ opacity: .1, transition: '1s', transform: 'translateY(90%)' }} className="bg-white space-y-10 p-5 max-w-4xl mx-auto">
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
                    <p>Thumbnail or color :</p>
                    <div className="mt-2 flex flex-col gap-2">
                        <div className="flex">
                            {localData?.thumbnail ? <div className="relative">
                                <div className="flex items-center">
                                    <img className="h-[80px] relative 1-[100px]" src={localData?.thumbnail} alt="" />
                                    <p onClick={handleThumbnailDelete} className="text-red-600 text-sm cursor-pointer pl-2">remove</p>
                                </div>
                                <div className="absolute top-[50%] left-[50%]" style={{ transform: 'translate(-90%, -50%)' }}>
                                    <input onChange={(e) => fileInput(e.target)} type="file" id="fileInput" style={{ display: 'none' }} />
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

                        <div className="flex mt-10 items-center gap-2">
                            <span>Alt color :</span>
                            <input defaultValue={localData?.color} type="color" name="color" id="color" />
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
            <SectionComponent id={'blogForm'} from={'translateY'}></SectionComponent>

        </div>
    );
};

export default CreateBlogPage;