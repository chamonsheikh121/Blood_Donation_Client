import { Helmet } from 'react-helmet';
import img from './../../assets/blogs/blog1.jpg'
import './Blog.css'

const Blogs = () => {
    return (
        <div className="text-gray-700 max-w-7xl mx-auto ">
            <Helmet>
                <title> All blogs</title>
            </Helmet>
            <h1 className="text-center font-bold   text-4xl my-10 ">All update blogs</h1>
            <div className="lg:grid lg:grid-cols-12 p-5 lg:p-0 lg:gap-10 flex flex-col-reverse">
                <div className="col-span-8  space-y-10">
                    <div className='space-y-5'>
                        <div>
                            <img className='w-full h-[400px]' src={img} alt="" />
                        </div>
                        <h3 className='text-2xl pl-1 font-semibold'>Lorem, ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, minus?</h3>
                        <p className='text-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum velit repellat explicabo fugit amet dolores recusandae necessitatibus aut eligendi qui eaque officia incidunt enim, mollitia repudiandae asperiores consectetur provident, molestias saepe deserunt cum neque? Ipsa exercitationem accusamus dolor itaque, non minus dignissimos modi ad odit illo tempore quis omnis temporibus!</p>
                        <div className='font-semibold'>
                            <p>published date :</p>
                            <span>11 / 23/ 20021</span>
                        </div>
                    </div>
                    <div className='space-y-5'>
                        <div>
                            <img className='w-full h-[400px]' src={img} alt="" />
                        </div>
                        <h3 className='text-2xl pl-1 font-semibold'>Lorem, ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, minus?</h3>
                        <p className='text-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum velit repellat explicabo fugit amet dolores recusandae necessitatibus aut eligendi qui eaque officia incidunt enim, mollitia repudiandae asperiores consectetur provident, molestias saepe deserunt cum neque? Ipsa exercitationem accusamus dolor itaque, non minus dignissimos modi ad odit illo tempore quis omnis temporibus!</p>
                        <div className='font-semibold'>
                            <p>published date :</p>
                            <span>11 / 23/ 20021</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 sticky-sidebar bg-gray-100  overflow-scroll">
                    <h1 className='text-2xl mb-10 mt-2 font-bold text-center '>Blogs list</h1>
                    <div className='cursor-pointer'>
                        <div className='flex gap-5 bg-white  m-2 '>
                            <figure className='w-[150px]'>
                                <img className='w-full' src={img} alt="" />
                            </figure>
                            <div className='flex flex-col justify-between'>
                                <h3 className='text-xl font-bold'>Lorem ipsum dolor</h3>
                                <div className='font-semibold text-xs'>
                                    <p>published date :</p>
                                    <span>11 / 23/ 20021</span>
                                </div>

                            </div>
                        </div>
                        <hr className='border border-gray-300 w-10/12 mx-auto mt-5' />
                    </div>
                    {/* ================== */}
                    <div className='cursor-pointer'>
                        <div className='flex gap-5 bg-white  m-2 '>
                            <figure className='w-[150px]'>
                                <img className='w-full' src={img} alt="" />
                            </figure>
                            <div className='flex flex-col justify-between'>
                                <h3 className='text-xl font-bold'>Lorem ipsum dolor</h3>
                                <div className='font-semibold text-xs'>
                                    <p>published date :</p>
                                    <span>11 / 23/ 20021</span>
                                </div>

                            </div>
                        </div>
                        <hr className='border border-gray-300 w-10/12 mx-auto mt-5' />
                    </div>
                    {/* ================== */}
                    <div className='cursor-pointer'>
                        <div className='flex gap-5 bg-white  m-2 '>
                            <figure className='w-[150px]'>
                                <img className='w-full' src={img} alt="" />
                            </figure>
                            <div className='flex flex-col justify-between'>
                                <h3 className='text-xl font-bold'>Lorem ipsum dolor</h3>
                                <div className='font-semibold text-xs'>
                                    <p>published date :</p>
                                    <span>11 / 23/ 20021</span>
                                </div>

                            </div>
                        </div>
                        <hr className='border border-gray-300 w-10/12 mx-auto mt-5' />
                    </div>
                    {/* ================== */}
                    <div className='cursor-pointer'>
                        <div className='flex gap-5 bg-white  m-2 '>
                            <figure className='w-[150px]'>
                                <img className='w-full' src={img} alt="" />
                            </figure>
                            <div className='flex flex-col justify-between'>
                                <h3 className='text-xl font-bold'>Lorem ipsum dolor</h3>
                                <div className='font-semibold text-xs'>
                                    <p>published date :</p>
                                    <span>11 / 23/ 20021</span>
                                </div>

                            </div>
                        </div>
                        <hr className='border border-gray-300 w-10/12 mx-auto mt-5' />
                    </div>
                    {/* ================== */}
                    <div>
                        <div className='flex gap-5 bg-white  m-2 '>
                            <figure className='w-[150px]'>
                                <img className='w-full' src={img} alt="" />
                            </figure>
                            <div className='flex flex-col justify-between'>
                                <h3 className='text-xl font-bold'>Lorem ipsum dolor</h3>
                                <div className='font-semibold text-xs'>
                                    <p>published date :</p>
                                    <span>11 / 23/ 20021</span>
                                </div>

                            </div>
                        </div>
                        <hr className='border border-gray-300 w-10/12 mx-auto mt-5' />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Blogs;