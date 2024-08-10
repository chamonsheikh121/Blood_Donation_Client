import PropTypes from 'prop-types'
import SectionComponent from '../SectionComponent/SectionComponent';
import UseAuthContext from '../../Hooks/UseAuthContext';
import './style.css'
import Swal from 'sweetalert2';

const ProfileUpdateMessage = ({ status, data }) => {
    const initialInfo = true;
    const { verifyEmail, user } = UseAuthContext()
    const handleEmailVerification = () => {
        verifyEmail()
            .then(() => {
                Swal.fire(`${'please, check your email'}`);
            })
            .catch(error => console.log(error))
    }

    console.log(user?.emailVerified);
    return (
        <div id='profileUpdateMessage' style={{ opacity: '.9', transform: 'translateY(-90%)', transition: '1s', transitionDelay: '1s' }} className="bg-purple-900 w-full    flex justify-center items-center text-white">
            <div className="w-10/12 mx-auto flex items-center justify-center">
                <div className='space-y-1 p-1 border-r-4 md:mr-5 md:pr-5 flex flex-col items-center justify-center'>
                    <p>Please Verify your email</p>
                    {
                        user?.emailVerified ? <button className='px-10 py-1 border-green   bg-green-400 font-bold text-gray-600 '>Verified</button> : <button onClick={handleEmailVerification} className='px-10  border-yellow hover:border-2 hover:border-yellow-600 hover:bg-white  btn btn-sm bg-yellow-400 text-black'>Verify now</button>
                    }

                </div>

                <div>
                    <p className="text-center mb-1">Please update your profile 100% for account activation   </p>

                    <div className="max-w-4xl relative flex-1 mx-auto h-[20px] bg-white p-[2px]">
                        <p style={{ width: `${status ? status : '0'}%`, transition: '1s' }} className={`bg-green-600 h-full`}></p>
                        <span className="w-[40px] absolute -right-16 -top-1 text-center h-full text-white">{status} %</span>
                    </div>
                    <p className='text-center'> upadte [
                        <span className={`pl-2 ${initialInfo ? 'text-green-400' : 'text-white'}`}>Initial info,</span>
                        <span className={`pl-2 ${data?.donarImage ? 'text-green-400' : 'text-white'}`}>Profile photo,</span>
                        <span className={`pl-2 ${data?.donarName ? 'text-green-400' : 'text-white'}`}>Your name ,</span>
                        <span className={`pl-2 ${data?.donarPhone ? 'text-green-400' : 'text-white'}`}>Phone ,</span>
                        <span className={`pl-2 ${data?.healthStatus ? 'text-green-400' : 'text-white'}`}>Health status,</span>
                        <span className={`pl-2 ${data?.recentTravelHistory ? 'text-green-400' : 'text-white'}`}>Recent travel history ,</span>
                        <span className={`pl-2 ${data?.weight ? 'text-green-400' : 'text-white'}`}>Weight ,</span>
                        <span className={`pl-2 ${data?.lastDonation ? 'text-green-400' : 'text-white'}`}>Last donation,</span>
                        <span className={`pl-2 ${data?.medication ? 'text-green-400' : 'text-white'}`}>Medication ,</span>
                        <span className={`pl-2 ${data?.dateOfBirth ? 'text-green-400' : 'text-white'}`}>Date of birth</span>  ]</p>
                </div>
            </div>

            <SectionComponent id={'profileUpdateMessage'} from={'translateY'}></SectionComponent>
        </div >
    );
};

export default ProfileUpdateMessage;
ProfileUpdateMessage.propTypes = {
    status: PropTypes.node,
    data: PropTypes.node
}