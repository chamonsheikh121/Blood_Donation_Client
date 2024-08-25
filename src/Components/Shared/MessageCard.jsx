import PropTypes from 'prop-types'
import UseUser from '../../Hooks/UseUser';

import Swal from 'sweetalert2';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';



const MessageCard = ({ messageData }) => {
    const [admin] = UseUser()
    const axiosPublic = UseAxiosPublic()

    const { _id, messageTitle, message, status, date, time } = messageData;
    const handleMessageStatus = async (id) => {
        if (status == 'checked') {
            alert('already accepted')
            return;
        }
        const res = await axiosPublic.patch(`/api/v1/update-message?id=${id}`)
        const data = res.data;
        if (data?.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "accepted",
                showConfirmButton: false,
                timer: 1500
            });

        }
    }
    return (
        <div className='text-gray-600'>
            <p className='text-sm underline underline-offset-4 text-center text-gray-600 font-semibold'>{time} , {date}</p>
            <div className='flex items-center gap-10'>
                <div className="form-control">
                    <label className="label" >
                        {
                            admin?.userRole == 'admin' || <input type="checkbox" title={status == 'checked' ? 'admin checked' : 'admin did not checked'} checked={status == 'checked'} className="checkbox cursor-not-allowed" />

                        }                    </label>
                </div>
                <div>
                    <div className='flex items-center gap-10'>
                        <h4 className='font-bold'><span className='text-xl font-extrabold '>{messageTitle}</span></h4>
                        {
                            admin?.userRole == 'admin' && <button onClick={() => handleMessageStatus(_id)} className={` ${status == 'notChecked' ? 'bg-red-600 hover:bg-red-700 ' : 'bg-blue-700 hover:bg-blue-900'} px-10  text-white btn btn-xs`}>{status == 'notChecked' ? 'accept' : 'accepted'}</button>
                        }
                    </div>
                    <p className='pl-10 py-2'>{message}</p>
                </div>

            </div>





        </div>
    );
};

export default MessageCard;
MessageCard.propTypes = {
    messageData: PropTypes.object
}