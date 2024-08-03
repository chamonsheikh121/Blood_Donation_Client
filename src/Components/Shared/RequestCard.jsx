import { FaArrowRight, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PropTypes } from 'prop-types'
import img from './../../assets/Registration/blood.png'
import './RequestCard.css'


const RequestCard = ({ request, requestType }) => {
    const { _id, donarImage, donarName, donarEmail, requestedBloodGroup, requesterImage, requesterHospital, requesterFullAddress, requestedDate, requestedTime, } = request
    return (
        <div className="border cards flex flex-col justify-between  border-gray-200 rounded-md bg-gray-200 hover:bg-white  shadow-lg p-2">
            <div className="space-y-2">
                <div className="flex  justify-between text-gray-600">
                    <div className="flex items-center gap-2">
                        <img src={donarImage ? donarImage : img} className="w-[40px] h-[40px] p-[1px] bg-red-400 rounded-full" alt="" />
                        <div>
                            <h4 className="font-bold">{donarName}</h4>
                            <p className="text-xs">{donarEmail}</p>
                        </div>
                    </div>
                    <span className="text-3xl text-red-600 font-bold">{requestedBloodGroup}</span>
                </div>
                <div >
                    <img className="h-[180px] w-full rounded-md" src={requesterImage} alt="" />
                </div>
                <div className="text-gray-700 px-5" >
                    {/* <h4 className="text-2xl font-bold flex items-center gap-2">{requesterName} <span className="text-sm">(requester)</span></h4> */}
                    <p><span className="font-semibold">Hospital :</span> {requesterHospital}</p>
                    <p><span className="font-semibold">location :</span> {requesterFullAddress}</p>
                    <p className="font-semibold">Donation date & time :</p>
                    <p className="text-sm">{requestedDate} , {requestedTime}{requestedTime >= 12 ? ' PM' : ' AM'}</p>

                </div>
            </div>
            <div className="flex items-center px-5 justify-between">

                {
                    requestType ? <button className="btn bg-blue-600 text-white px-5 border-none btn-sm ">accept </button> : <button className="btn bg-gray-400 border-none btn-sm mt-2 hover:bg-gray-500 hover:text-white">Edit <FaEdit></FaEdit></button>
                }
                <Link to={requestType ? `/all-blood-donation-request/${_id}` : `/dashboard/my-donation-requests/${_id}`}><button className="btn btn-sm mt-2 border-none hover:text-white  text-white bg-red-600 hover:bg-red-700">details <FaArrowRight></FaArrowRight></button></Link>



            </div>
        </div>
    );
};

export default RequestCard;

RequestCard.propTypes = {
    request: PropTypes.node,
    requestType: PropTypes.node
}