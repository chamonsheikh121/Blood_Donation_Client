
import UseAuthContext from '../../Hooks/UseAuthContext';
import img from './../../assets/2148969982.jpg'
import './Contact.css'
import PropTypes from 'prop-types'

const ContactUs = ({ volunteers, isLoading }) => {
    const { user } = UseAuthContext()
    console.log(volunteers);
    return (
        <div className=''>
            <div style={{ backgroundImage: `url(${img})` }} className='contact w-full  h-[600px]'>
                <div className='w-full h-full bg-black opacity-50'>
                </div>
            </div>
            <div className='relative -top-20 text-gray-700   max-w-7xl w-full  sm:w-3/4 lg:w-full  mx-auto'>
                <div className='flex md:px-10 px-5 flex-col lg:flex-row  justify-around gap-32'>
                    {/* left side */}
                    <div className='flex-1 md:p-10 p-5  space-y-5  shadow-xl shadow-gray-300 bg-white'>
                        <p className='text-2xl md:text-3xl md:px-10 py-5 pb-10 font-bold text-gray-700 text-center'>Contact with volenter</p>
                        {
                            isLoading ? '' : volunteers?.length > 0 ? volunteers?.map((volunteer, index) => <div key={volunteer?._id}>
                                <div className={`flex ${user ? '' : 'blur-sm'} justify-between items-center`}>
                                    <div className='flex items-center gap-4'>
                                        <img className='rounded-full object-cover w-[50px] h-[50px]' src={volunteer?.donarImage} alt="" />
                                        <p className='text-2xl font-bold'>{volunteer?.donarName}</p>
                                    </div>
                                    <button disabled={!user} className={`btn  rounded-md bg-white text-green-700 font-bold uppercase  border-2 px-10 hover:bg-green-700 hover:text-white border-green-700`}>call</button>

                                </div>
                                {
                                    volunteers?.length - 1 != index && <hr className='mt-5' />
                                }
                            </div>
                            ) : null
                        }
                        {user ? '' : <p className='text-center'>for contacting with volunteers you must login</p>}
                    </div>


                    {/* right side */}
                    <div className='flex-1 md:p-10 p-2 space-y-5  shadow-xl shadow-gray-300 bg-white'>
                        <p className='text-3xl px-10 pb-10 font-bold text-gray-700 text-center'>Contact with volenter</p>
                        <div className=' flex blur-sm justify-between items-center '>
                            <div className='flex items-center gap-4'>
                                <img className='rounded-full w-[50px] object-cover h-[50px]' src={img} alt="" />
                                <p className='text-2xl font-bold'>Chamon ali</p>
                            </div>
                            <button className="btn rounded-md bg-white text-green-700 font-bold uppercase  border-2 px-10 hover:bg-green-700 hover:text-white border-green-700">call</button>

                        </div>
                        <hr />
                        <div className=' flex  justify-between items-center '>
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
    );
};

export default ContactUs;

ContactUs.propTypes = {
    volunteers: PropTypes.array,
    isLoading: PropTypes.bool
}