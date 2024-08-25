import { Helmet } from 'react-helmet';
// import img from './../../assets/blogs/blog1.jpg'
import './Blog.css'
import UsePost from '../../Hooks/UsePost';
// import UseAuthContext from '../../Hooks/UseAuthContext';
import BlogCard from '../../Components/Shared/BlogCard';
import Footer from './../HomePage/Footer';




const Blogs = () => {
    // const { user } = UseAuthContext()
    const [blogs, isLoading] = UsePost();

    return (
        <div>
            <div className="text-gray-700 max-w-7xl mx-auto ">
                <Helmet>
                    <title> All blogs</title>
                </Helmet>
                <h1 className="text-center font-bold   text-4xl my-10 ">All update blogs</h1>
                <div className="lg:grid lg:grid-cols-12 p-5 lg:p-0 lg:gap-10 flex flex-col-reverse">
                    <div className="col-span-8 scroll-smooth  index-100">
                        {
                            isLoading ? <div className=" flex  justify-center mt-10 w-full">
                                <span className="loading loading-lg"></span>
                            </div> : blogs?.length > 0 ? blogs?.map((blog, index) => <BlogCard
                                key={index}
                                blog={blog}
                            ></BlogCard>) : <div className=" flex  justify-center mt-10 w-full"><span
                                className="text-2xl font-extrabold"
                            >No blog found</span></div>
                        }
                    </div>
                    <div className="col-span-4 hidden lg:block sticky-sidebar bg-gray-200  ">
                        <h1 className='text-2xl mb-10 mt-2 font-bold text-center '>Blogs list</h1>
                        <hr className='mb-2 border-gray-500' />
                        <div className='cursor-pointer h-[600px] overflow-scroll space-y-2'>
                            {
                                isLoading ? <div className=" flex  justify-center mt-10 w-full">
                                    <span className="loading loading-lg"></span>
                                </div> : blogs?.length > 0 ? blogs?.map((blog, index) => <div

                                    key={index}
                                    className='cursor-pointer  flex items-center border-black'>

                                    <div className=''>
                                        <div className='flex  gap-5 bg-white  relative p-2 m-2 '>
                                            <a className=' absolute top-0 h-full w-full  block' href={`#${blog?._id}`}></a>

                                            <figure className=' w-[150px] flex items-center h-[100px]'>
                                                <img className='w-full' src={blog?.thumbnail} alt="" />
                                            </figure>
                                            <div className='flex flex-col justify-between'>
                                                <h3 className='text-xl font-bold'>{blog?.blogTitle}</h3>
                                                <div className='font-semibold text-xs'>
                                                    <p>published date :</p>
                                                    <span>{blog?.date} , {blog?.time}</span>
                                                </div>

                                            </div>
                                        </div>


                                        <hr className='border  border-gray-300 w-10/12 mx-auto mt-5' />

                                    </div>

                                </div>) : <div className=" flex  justify-center mt-10 w-full"><span
                                    className="text-2xl font-extrabold"
                                >No blog found</span></div>
                            }
                        </div>

                    </div>
                </div>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default Blogs;