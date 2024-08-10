import image from './../../../assets/blogs/blog1.jpg'
import blood from './../../../assets/Registration/blood.png'
import { MdEdit } from "react-icons/md";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import UseUser from "../../../Hooks/UseUser";
import { useEffect, useRef, useState } from 'react';
import ProfileModal_1 from './ProfileModal_1';
import { DNA } from 'react-loader-spinner';
import { FaCopy } from 'react-icons/fa';
// import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { ImCheckmark } from 'react-icons/im';
import UseMyRequest from '../../../Hooks/UseMyRequest';
import RequestCard from '../../../Components/Shared/RequestCard';
import SectionComponent from '../../../Components/SectionComponent/SectionComponent';
import UseMyAcceptation from '../../../Hooks/UseMyAcceptation';
import { UseDateConverter } from '../../../Hooks/UseDateConverter';




const Profile = () => {

    const [data, refetch, isLoading] = UseUser();
    const [myRequest, , isLoadMyRequest] = UseMyRequest()

    const [loading, setLoading] = useState(false)
    const [myThreeRequest, setMyThreeRequest] = useState()
    const [myThreeAcceptations, setMyThreeAcceptations] = useState()
    const [updatedName, setUpdatedName] = useState(data?.donarName)
    const [updatedImage, setUpdatedImage] = useState(null);
    const [activeStatus, setActiveStatus] = useState(data?.Status)
    const phoneInputValue = useRef()
    const healthInputValue = useRef()
    const travelInputValue = useRef()
    const weightInputValue = useRef()
    const lastDonationInputValue = useRef()
    const medicationInputValue = useRef()
    const dateOfBirthInputValue = useRef()
    const [saveActive, setSaveActive] = useState(false)
    const [UIDCopy, setUIDCopy] = useState(false)
    const axiosPublic = UseAxiosPublic()
    const [myAcceptations, isLoad] = UseMyAcceptation()
    
    if(data){
        const dateOfBirthDateCons = new Date(data?.dateOfBirth)
        var dateOfBirthDate  = UseDateConverter(dateOfBirthDateCons);
        console.log(data?.medication);
        const lastDonationDateCons = new Date(data?.lastDonation)
        var lastDonationDate = UseDateConverter(lastDonationDateCons)
        
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(healthInputValue);

        console.log(updatedImage);
        if (!updatedImage && updatedName == data?.donarName && phoneInputValue?.current?.value == data?.donarPhone && activeStatus == data?.status) {
            alert('nothing to be update')
            return
        }

        setLoading(true);
        const API_KEY = 'f6a950227b2e6c0fda979d39facb73d8';
        const api = `https://api.imgbb.com/1/upload?key=${API_KEY}`
        if (updatedImage) {
            const image = { 'image': updatedImage }
            const res = await axiosPublic.post(api, image, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            var imageData = res?.data?.data?.display_url
        }
        const profileUpdate = {
            donarEmail: data?.donarEmail,
            donarImage: imageData || data?.donarImage,
            donarName: updatedName,
            status: activeStatus || data?.status,
            donarPhone: phoneInputValue?.current?.value,
            healthStatus: healthInputValue?.current?.value,
            recentTravelHistory: travelInputValue?.current?.value,
            weight: weightInputValue?.current?.value,
            lastDonation: lastDonationInputValue?.current?.value,
            medication: medicationInputValue?.current?.value,
            dateOfBirth: dateOfBirthInputValue?.current?.value,
        }
        console.log(profileUpdate);
        axiosPublic.patch('/api/v1/user-profile', profileUpdate)
            .then(res => {
                if (res?.data?.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Profile updated successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setLoading(false)
                    refetch()

                }
            })
            .then(err => console.log(err))
        setLoading(false)

    }
    const handleUidCopy = () => {
        navigator.clipboard.writeText(data?.userUID)
        setUIDCopy(true)
    }
    useEffect(() => {
        const UpdateProfile = async () => {
            if (data?.donarEmail) {
                let count = 10;
                if (data?.donarImage) {
                    count = count + 10
                }
                if (data?.donarName) {
                    count = count + 10
                }
                if (data?.donarPhone) {
                    count = count + 10
                }
                if (data?.healthStatus) {
                    count = count + 10
                }
                if (data?.weight) {
                    count = count + 10
                }
                if (data?.dateOfBirth) {
                    count = count + 10
                }
                if (data?.lastDonation) {
                    count = count + 10
                }
                if (data?.medication) {
                    count = count + 10
                }
                if (data?.recentTravelHistory) {
                    count = count + 10
                }
                const countObj = {
                    count: count,
                    donarEmail: data?.donarEmail
                }
                console.log(data?.profileUpdateStatus != countObj?.count);
                if (data?.profileUpdateStatus != countObj?.count) {
                    const res = await axiosPublic.patch('/api/v1/user-profile', countObj)
                    const data = res.data;
                    refetch()
                    console.log('profile Updated successfully', data);
                }

            }
        }
        UpdateProfile()
    }, [data, axiosPublic, refetch])
    useEffect(() => {
        if (myRequest) {
            setMyThreeRequest(myRequest?.slice(0, 3))
        }
    }, [myRequest])
    useEffect(() => {
        if (myAcceptations) {
            setMyThreeAcceptations(myAcceptations?.slice(0, 3))
        }
    }, [myAcceptations])

    return (
        <div className="p-10" id="profile" style={{ opacity: .1, transition: '1s', transform: 'translateY(-90%)' }}>

            {data ? <div >
                <div className="flex md:flex-row flex-col gap-6">
                    <div className=" p-5   relative  bg-white space-y-10  text-gray-600">
                        <figure className="relative">

                            <img className="w-[250px] h-[250px] mx-auto rounded-full" src={data?.donarImage ? data?.donarImage : image} alt="" />
                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <button className="btn btn-sm absolute -top-2 -right-2" onClick={() => document.getElementById('my_modal_1').showModal()}><MdEdit size={20}></MdEdit></button>
                            <ProfileModal_1
                                data={data}
                                setUpdatedImage={setUpdatedImage}
                                setSaveActive={setSaveActive}
                                setUpdatedName={setUpdatedName}
                                phoneInputValue={phoneInputValue}
                                setActiveStatus={setActiveStatus}
                                saveActive={saveActive}
                                healthInputValue={healthInputValue}
                                travelInputValue={travelInputValue}
                                weightInputValue={weightInputValue}
                                lastDonationInputValue={lastDonationInputValue}
                                medicationInputValue={medicationInputValue}
                                dateOfBirthInputValue={dateOfBirthInputValue}
                                loading={loading}
                                handleFormSubmit={handleFormSubmit}></ProfileModal_1>
                        </figure>
                        <div className='space-y-2'>
                            <div className="flex items-end  gap-4">
                                <span className="text-3xl font-extrabold">
                                    {data ? data?.donarName : 'name: not given'} </span>

                            </div>
                            <p className="font-semibold"> {data?.donarEmail ? data?.donarEmail : 'not given'}</p>
                            <p className="font-bold"><span className='font-bold'>Phone </span> : 
                            
                            <span className={`${data?.donarPhone ? 'text-green-600':'text-red-500'} pl-2`}>{data?.donarPhone ? data.donarPhone : 'not given'}</span>
                            
                            </p>
                            <p className="font-semibold flex items-center gap-3"><span className='font-bold'>userID</span>: <span className='text-blue-600'> {data?.userUID} {
                                UIDCopy ? <ImCheckmark onClick={handleUidCopy} className='inline ml-2 text-green-500 cursor-pointer' size={20}></ImCheckmark> : <FaCopy onClick={handleUidCopy} className='inline ml-2 text-gray-500 cursor-pointer' size={20}></FaCopy>
                            }</span> </p>

                            <p className="font-bold"><span className=''>Health status  </span> : <span className={`${data?.healthStatus ? 'text-green-600':'text-red-500'}`}>{data?.healthStatus ? data.healthStatus : 'not given'}</span></p>
                            <p className="font-bold"><span className=''>Recent travel history  </span> : 
                            <span className={`${data?.recentTravelHistory ? 'text-green-600':'text-red-500'} pl-2`}>{data?.recentTravelHistory ? data.recentTravelHistory : 'not given'}</span>
                            </p>
                            <p className="font-bold"><span className=''>Weight  </span> :  
                            <span className={`${data?.weight ? 'text-green-600':'text-red-500'} pl-2`}>{data?.weight ? `${ data?.weight} kg` : 'not given'}</span>
                            </p>
                            <p className="font-bold"><span className=''>Profile Update status  </span> : 
                            
                            
                            <span className={`${data?.profileUpdateStatus ? 'text-green-600':'text-red-500'} pl-2`}>{data?.profileUpdateStatus ? data?.profileUpdateStatus : 'not given'}</span>
                            
                            </p>
                            <p className="font-bold"><span className=''>Last donation  </span> : 
                            
                            <span className={`${data?.lastDonation  ? 'text-green-600':'text-red-500'} pl-2`}>{data?.lastDonation ? lastDonationDate : 'not given'}</span>
                            
                            </p>
                            <p className="font-bold"><span className=''>Medication  </span> : 
                            
                            <span className={`${data?.lastDonation  ? 'text-green-600':'text-red-500'} pl-2`}>{data?.medication ? data.medication : 'not given'}
                            </span>
                            
                            </p>
                            <p className="font-bold"><span className=''>Date of birth  </span> : 
                            <span className={`${data?.dateOfBirth  ? 'text-green-600':'text-red-500'} pl-2`}>{data?.dateOfBirth ? dateOfBirthDate : 'not given'}
                            
                            </span>
                            
                            </p>


                            <p className="mt-3 flex items-center justify-between  rounded-full"><span className='font-bold'>active status</span>:<div className={`relative h-[30px]  transition-all  w-[60px]`}>
                                <button className={`${data?.status == 'true' ? 'bg-green-500' : 'bg-gray-300'} h-full transition-all border-2  w-full border-gray-500  rounded-full`}></button>
                                <span className={`w-[30px] h-[30px]  absolute  ${data?.status == 'true' ? 'right-[2px] ' : 'left-[2px]'} transition-all border-2 border-gray-500 bg-gray-50 rounded-full h-full`}></span>
                            </div> </p>

                        </div>
                    </div>
                    <div className=" flex-1 bg-white relative">

                        {/* <span className="btn absolute top-5 right-5" onClick={() => document.getElementById('my_modal_2').showModal()}><MdEdit size={25}></MdEdit></span>
                        <ProfileModal_2
                            data={data}
                            setSaveActive={setSaveActive}
                            saveActive={saveActive}
                            loading={loading}
                            handleProfileDetailsSubmit={handleProfileDetailsSubmit}
                        ></ProfileModal_2> */}
                        <div className="flex items-center justify-center gap-1">
                            <img className="w-[70px]" src={blood} alt="" />
                            <span className="text-3xl font-extrabold text-red-600">{data?.BloodGroup?.group}</span>
                            <img className="w-[70px]" src={blood} alt="" />
                        </div>
                        <div className="p-5 space-y-2 text-gray-600">
                            <div>
                                <span className="text-xl font-bold ">Blood:</span>
                                <div className="ml-5">

                                    <p>Antigens : {data?.BloodGroup?.antigens?.map((antigen, index) => <span className="px-2" key={antigen}>{antigen}
                                        {
                                            data?.BloodGroup?.antigens?.length - 1 != index && <span> ,</span>
                                        }
                                    </span>)}

                                    </p>
                                    <p>Antibodies : {data?.BloodGroup?.antibodies?.map((antibodie, index) => <span className="px-2" key={antibodie}>{antibodie}
                                        {
                                            data?.BloodGroup?.antibodies?.length - 1 != index && <span> ,</span>
                                        }
                                    </span>)}</p>
                                    <p>CanDonateTo : {data?.BloodGroup?.canDonateTo?.map((canDonate, index) => <span className="px-1" key={canDonate}> {canDonate}

                                        {
                                            data?.BloodGroup?.canDonateTo?.length - 1 != index && <span> ,</span>
                                        }

                                    </span>)}</p>
                                    <p>CanReceiveFrom :  {data?.BloodGroup?.canReceiveFrom?.map((canReceive, index) => <span className="px-1" key={canReceive}> {canReceive}
                                        {
                                            data?.BloodGroup?.canReceiveFrom?.length - 1 != index && <span> ,</span>
                                        }
                                    </span>)}</p>
                                </div>
                            </div>
                            <div>
                                <span className="text-xl font-bold ">Division:</span>
                                <div className="ml-5">
                                    <p>Name : {data?.Division?.name}</p>
                                    <p>Name (Bangla) : {data?.Division?.bn_name}</p>
                                    <p>Official site : <a href={data?.Division?.url} target="_blank" className="underline underline-offset-2">{data?.Division?.url}</a></p>
                                </div>
                            </div>
                            <div>
                                <span className="text-xl font-bold ">District:</span>
                                <div className="ml-5">
                                    <p>Name : {data?.District?.name}</p>
                                    <p>Name (Bangla) : {data?.District?.bn_name}</p>
                                    <p>Lat : {data?.District?.lat}</p>
                                    <p>Lon : {data?.District?.lon}</p>
                                    <p>Official site : <a href={data?.District?.url} target="_blank" className="underline underline-offset-2">{data?.District?.url}</a></p>
                                </div>
                            </div>
                            <div>
                                <span className="text-xl font-bold ">Upazila:</span>
                                <div className="ml-5">
                                    <p>Name : {data?.Upazila?.name}</p>
                                    <p>Name (Bangla) : {data?.Upazila?.bn_name}</p>
                                    <p>Official site : <a href={data?.Upazila?.url} target="_blank" className="underline underline-offset-2">{data?.Upazila?.url}</a></p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div style={{ opacity: '1.', transition: '1s', transform: 'translateX(-90%)' }} id='recentDonation' className="pb-10">
                    <p className="text-3xl font-bold mt-20 mb-5 text-center  text-gray-600">My recent donation:</p>

                    <div className="relative grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10 md:mx-10">
                        {
                            isLoad ? <div className='w-full flex justify-center items-center mt-5'><span className="loading loading-spinner loading-lg"></span></div> : myThreeAcceptations?.length > 0 ? myThreeAcceptations?.map(request => <RequestCard
                                key={request?._id}
                                request={request}
                            ></RequestCard>) : <div className="absolute w-full text-center mt-5 "><span
                                className="text-2xl font-extrabold"
                            >Not donated yet</span></div>
                        }
                    </div>
                </div>
                <div style={{ opacity: '.1', transition: '1s', transform: 'translateX(90%)' }} id='recentRequest' className="m-10">
                    <p className="text-3xl font-bold mt-20 mb-5 text-center  text-gray-600">My recent request&apos;s:</p>

                    <div className="grid relative md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10 md:mx-10">
                        {
                            isLoadMyRequest ? <div className='w-full flex justify-center items-center mt-5'><span className="loading loading-spinner loading-lg"></span></div> : myThreeRequest?.length > 0 ? myThreeRequest?.map(requests => <RequestCard
                                key={requests?._id}
                                request={requests}
                            ></RequestCard>) : <div className="absolute  w-full text-center mt-5 "><span
                                className="text-2xl font-extrabold"
                            >Not requested yet</span></div>
                        }
                    </div>
                </div>
            </div> : <div className='w-full flex items-center justify-center mt-10'>
                <DNA
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                /></div>}
            {
                !isLoading && data && <SectionComponent id={'profile'} from={'translateY'}></SectionComponent>
            }

            {
                data && <SectionComponent id={'recentRequest'} from={'translateX'}></SectionComponent>
            }
            {
                data && <SectionComponent id={'recentDonation'} from={'translateX'}></SectionComponent>
            }

        </div >
    );
};

export default Profile;