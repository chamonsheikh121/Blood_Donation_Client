import img from './../../assets/2148969982.jpg'
import './Contact.css'

const ContactUs = () => {
    return (
        <div>
            <div style={{ backgroundImage: `url(${img})` }} className='contact w-full  h-[600px]'>
                <div className='w-full h-full bg-black opacity-50'>
                </div>
                <div className='relative border border-black max-w-7xl mx-auto'>
                    <div className=' -top-20 flex  gap-40 absolute w-full  justify-between mx-auto '>
                        <div className='flex-1 bg-white'>
                                <p className='text-3xl p-10 font-bold text-gray-700 text-center'>Contact with volenter</p>
                            <div className='p-10 flex border justify-between items-center border-black'>
                                <div className='flex items-center gap-4'>
                                    <img className='rounded-full w-[50px] h-[50px]' src={img} alt="" />
                                    <p className='text-2xl font-bold'>Chamon ali</p>
                                </div>
                                <button className="btn rounded-md bg-white text-green-700 font-bold uppercase  border-2 px-10 hover:bg-green-700 hover:text-white border-green-700">call</button>

                            </div>
                        </div>
                        <div className='flex-1 bg-white'>
                        <p className='text-3xl p-10 font-bold text-gray-700 text-center'>Contact with volenter</p>
                            <div className='p-5 flex border items-center border-black'>
                                <div className='flex items-center gap-4'>
                                    <img className='rounded-full w-[50px] h-[50px]' src={img} alt="" />
                                    <p className='text-2xl font-bold'>Chamon ali</p>
                                </div>
                                <button className="btn rounded-md bg-white text-green-700 font-bold uppercase  border-2 px-10 hover:bg-green-700 hover:text-white border-green-700">call</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ContactUs;