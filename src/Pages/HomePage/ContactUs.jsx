
import { BiSend } from 'react-icons/bi';
import UseAuthContext from '../../Hooks/UseAuthContext';
import img from './../../assets/2148969982.jpg'
import './Contact.css'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react';
import UseUser from '../../Hooks/UseUser';
import Swal from 'sweetalert2';

const ContactUs = ({ volunteers, isLoading }) => {
    const { user } = UseAuthContext()
    const nameValue = useRef();
    const emailValue = useRef();
    const messageValue = useRef();
    const [myData] = UseUser()
    const [loading, setLoading] = useState(false)

    const handleMessageSend = () => {
        setLoading(true);
        setTimeout(() => {
            Swal.fire({
                title: "message send successfully",
                icon: "success"
            });
            setLoading(false)
            messageValue.current.value = ''
        }, 3000);
    }


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
                        <p className='text-2xl md:text-3xl md:px-10 py-5  font-bold text-gray-700 text-center'>Contact with volunteer</p>
                        <hr />

                        {
                            isLoading ? '' : volunteers?.length > 0 ? volunteers?.map((volunteer, index) => <div key={volunteer?._id}>
                                <div className={`flex ${user ? '' : 'blur-sm'}flex-col md:flex-row justify-between gap-4`}>
                                    <div className='flex items-center gap-4'>
                                        <img className='rounded-full object-cover w-[50px] h-[50px]' src={volunteer?.donarImage} alt="" />
                                        <p className='text-xl md:text-2xl  font-bold'>{volunteer?.donarName}</p>
                                    </div>
                                    <a href={`tel: +88${volunteer?.donarPhone}`} disabled={!user} className={`btn  rounded-md bg-white text-green-700 font-bold uppercase  border-2 px-10 hover:bg-green-700 hover:text-white border-green-700`}>call</a>

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
                        <p className='text-3xl px-10 pb-10 font-bold text-gray-700 text-center'>Email to volunteer</p>

                        <hr />
                        <div className='text-sm space-y-6'>
                            <select className="select select-success w-full focus:outline-none bg-gray-100">
                                <option disabled selected>Select a volunteer</option>
                                {
                                    volunteers?.length > 0 && volunteers?.map(volunteer => <option
                                        className='h-[60px]'
                                        key={volunteer?._id}>{volunteer?.donarName}</option>)
                                }
                            </select>
                            <div className='flex flex-col md:flex-row  gap-2 items-center'>
                                <div className='flex flex-col w-full md:w-fit gap-2'>
                                    <label htmlFor="myName">Name :</label>
                                    <input
                                        type="text"
                                        defaultValue={myData?.donarName}
                                        placeholder="Type here"
                                        id='myName'
                                        ref={nameValue}
                                        className="input w-full focus:outline-none input-bordered input-success " />
                                </div>
                                <div className='flex flex-col w-full gap-2'>
                                    <label htmlFor="myEmail">Email :</label>
                                    <input
                                        type="email"
                                        defaultValue={myData?.donarEmail}
                                        placeholder="Type here"
                                        id='myEmail'
                                        ref={emailValue}
                                        className="input focus:outline-none input-bordered input-success w-full" />
                                </div>

                            </div>
                            <textarea ref={messageValue} className="textarea  w-full h-[100px] focus:outline-none textarea-success" placeholder="Email body"></textarea>
                            <div className='flex items-center justify-center'>
                                <button disabled={!user} onClick={handleMessageSend} className='btn text-gray-100 btn-success px-14 flex items-center'>{loading ? <span className='loading'></span > : <span className='flex items-center'>Send <BiSend size={20}></BiSend></span>}</button>
                            </div>
                            {user ? '' : <p className='text-center'>for emailing to  volunteers you must login</p>}

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