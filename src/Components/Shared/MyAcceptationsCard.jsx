import PropTypes from 'prop-types'
import img from './../../assets/Registration/blood.png'
import { Link } from 'react-router-dom';

const MyAcceptationsCard = ({ acceptationData }) => {

    // const date = UseDateConverter(acceptationData?.requestedDate)
    //_id,donarName,donarEmail,requesterName,requestedBloodGroup,requesterDivision,requesterDistrict,requesterUpazila,requesterHospital,requestedDate,requestedTime,requesterPhone,requesterFullAddress,requesterMessage,requesterImage,serialNumber,acceptedUserDetails,requestedId,status
    const { donarName, donarImage, donarEmail, requesterName, requestedBloodGroup, requesterHospital, requestedDate, requestedTime, requesterPhone, requesterFullAddress, requesterImage, status, requestedId } = acceptationData;



    return (
        <div className={`flex ${status == 'fullFilled' ? 'bg-green-200' : 'bg-red-200'} border border-black  p-5 rounded-md items-center justify-between`}>

            <div className='flex-1 flex   gap-5'>
                <div className='w-[200px] h-[150px]'>
                    <img className='w-full h-full object-cover rounded-md' src={requesterImage} alt="" />
                </div>
                <div>
                    <div className='flex items-center gap-10'>
                        <div className='flex items-start gap-2'>
                            <img className='w-[50px] h-[50px] rounded-full' src={donarImage} alt="" />
                            <div>
                                <h6 className='text-xl text-gray-500 font-bold '>{donarName}</h6>
                                <p className='text-sm text-gray-500'>{donarEmail}</p>
                            </div>

                        </div>
                        <div className='flex  items-center justify-center'>
                            <img className='w-[30px]' src={img} alt="" />
                            <span className={`text-2xl ${status == 'fullFilled' ? 'text-green-900' : 'text-red-900'} font-extrabold`}>{requestedBloodGroup}</span>
                            <img className='w-[30px]' src={img} alt="" />
                        </div>
                    </div>
                    <div className='mt-2'>
                        <p className='text-xl font-semibold'>Requester : {requesterName}</p>
                        <p className='font-semibold'>Address : {requesterHospital}, {requesterFullAddress}</p>
                        <p className='font-semibold'>Date & time : {requestedDate}, {requestedTime}</p>
                    </div>


                </div>
            </div>
            <div className='flex flex-col justify-center gap-2'>
                {/* my-donation-requests/:id */}
                <Link to={`/dashboard/my-donation-requests/${requestedId}`}><button className='px-10 text-black  btn border border-gray-500'>See details</button></Link>

                <p className={`px-10  ${status =='fullFilled' ? 'bg-green-600 text-white' : 'bg-red-500'} py-3 cursor-not-allowed rounded-md text-white text-sm`}>{status}</p>
                {
                    status == 'fullFilled' ||
                    <a className='w-full' href={`tel: ${requesterPhone}`}><button className='px-10 w-full bg-blue-700 hover:bg-blue-900 text-white btn'>call now</button></a>
                }
            </div>



        </div>
    );
};

export default MyAcceptationsCard;
MyAcceptationsCard.propTypes = {
    acceptationData: PropTypes.node
}