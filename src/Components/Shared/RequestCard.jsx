import { FaArrowRight, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PropTypes } from 'prop-types'
import img from './../../assets/Registration/blood.png'
import './RequestCard.css'
import { UseDateConverter } from "../../Hooks/UseDateConverter";
import { UseTimeConverter } from "../../Hooks/UseTimeConverter";


const RequestCard = ({ request, requestType }) => {

    const dateConstructor = new Date(request?.requestedDate);
    const date = UseDateConverter(dateConstructor)
    const time = UseTimeConverter(request?.requestedTime)

    const { _id, donarImage, donarName, donarEmail, requestedBloodGroup, requesterImage, requesterHospital, requesterFullAddress, } = request


    return (
        <div className="border cards flex flex-col justify-between  border-gray-300 rounded-md bg-gray-200 hover:bg-white  shadow-lg p-2">
            <div className="space-y-2">
                <div className="flex  justify-between text-gray-600">
                    <div className="flex items-center gap-2">
                        <img src={donarImage ? donarImage : img} className="w-[40px] object-cover h-[40px] p-[1px] bg-red-400 rounded-full" alt="" />
                        <div>
                            <h4 className="font-bold">{donarName}</h4>
                            <p className="text-xs">{donarEmail}</p>
                        </div>
                    </div>
                    <span className="text-3xl text-red-600 font-bold">{requestedBloodGroup}</span>
                </div>
                <div >
                    <img className="h-[180px] w-full rounded-md object-cover" src={requesterImage} alt="" />
                </div>
                <div className="text-gray-700 px-5" >
                    {/* <h4 className="text-2xl font-bold flex items-center gap-2">{requesterName} <span className="text-sm">(requester)</span></h4> */}
                    <p><span className="font-semibold">Hospital :</span> {requesterHospital}</p>
                    <p><span className="font-semibold">location :</span> {requesterFullAddress}</p>
                    <p className="font-semibold">Donation date & time :</p>
                    <p className="text-sm">{date}</p>
                    <p className="text-sm">{time}</p>

                </div>
            </div>
            <div className="flex items-center px-5 justify-between">

                {
                    requestType ? null :
                        <Link to={`/dashboard/my-donation-requests/${_id}/edit`}> <button className="btn bg-gray-400 border-none btn-sm mt-2 hover:bg-gray-500 hover:text-white">Edit <FaEdit></FaEdit></button></Link>
                }
                <Link to={requestType ? `/all-blood-donation-request/${_id}` : `/dashboard/my-donation-requests/${_id}`}><button className="btn btn-sm mt-2 border-none hover:text-white  text-white bg-red-600 hover:bg-red-700">details <FaArrowRight></FaArrowRight></button></Link>



            </div>
        </div>
    );
};

export default RequestCard;

RequestCard.propTypes = {
    request: PropTypes.object,
    requestType: PropTypes.node
}