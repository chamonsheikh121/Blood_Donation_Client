import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const PreviewBlog = () => {
    const [data, setData] = useState()
    if (data) {
        var { name, email, blogTitle, description, publisherImage, date, time, thumbnail, bgColor } = data
    }
    console.log(bgColor);
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('blogPreview')))
    }, [])

    return (
        <div className="border border-gray-300 p-5 max-w-4xl mx-auto">

            <div className=" p-5  flex flex-col-reverse">
                <div className=" space-y-10">
                    <div className='space-y-5'>
                        <div className={`h-[400px] ${thumbnail ? '' : `flex items-center justify-center bg-gradient-to-b from-purple-700 to-violet-700`}  red-700 w-full border relative`}>
                            <div className='w-[60px] absolute top-2 left-2 p-1 flex items-center gap-5 bg-white rounded-full h-[60px]'>
                                <img className='w-full object-cover rounded-full h-full' src={publisherImage} alt="" />
                                <div className=''>
                                    <h1 className="text-xl  font-bold text-gray-200">{name}</h1>
                                    <p className='text-sm text-gray-400'>{email}</p>
                                </div>
                            </div>
                            {
                                !thumbnail && <h1 className="text-3xl font-bold text-white">{blogTitle}</h1>
                            }
                            {
                                thumbnail && <img className="w-full h-full object-cover" src={thumbnail} alt="" />
                            }
                        </div>
                        <h3 className='text-2xl pl-1 font-semibold'>{blogTitle}</h3>
                        <p className='text-md'>{description}</p>
                        <div className='font-semibold'>
                            <p>Published date & time :</p>
                            <span>{date} , {time}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                        <Link to={'/dashboard/create-blog'}><button className="btn bg-green-700 hover:bg-green-800 text-white max-w-72  w-full">
                        <FaArrowLeft></FaArrowLeft> back</button></Link>
                    </div>
        </div>
    );
};

export default PreviewBlog;