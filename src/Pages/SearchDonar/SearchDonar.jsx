import blood from './../../assets/Registration/blood.png'
import { ImCheckmark } from "react-icons/im";
import { FaCopy } from "react-icons/fa";
import './SearchDonar.css'
// import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import { useEffect, useRef, useState } from 'react';

import { useLocation } from 'react-router-dom';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import Footer from '../HomePage/Footer';


const SearchDonar = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState()
    const axiosPublic = UseAxiosPublic()
    const value = useRef()
    const [searchInputValue, setSearchInputValue] = useState()
    const location = useLocation();
    const searchParam = new URLSearchParams(location?.search);
    const email = searchParam.get('email')


    const handleSearch = async () => {
        setLoading(true)
        const inputValue = value.current.value
        const isEmail = inputValue.indexOf('@')
        let idOrEmail;
        if (isEmail != -1) {
            idOrEmail = inputValue
        }
        else {
            idOrEmail = parseInt(value.current.value)
        }
        console.log(isEmail);
        const res = await axiosPublic.get(`/api/v1/user/${idOrEmail}`)
        if (res) {
            setData(res?.data)
            setLoading(false)
        }
    }

    const [UIDCopy, setUIDCopy] = useState(false)

    const handleUidCopy = () => {
        navigator.clipboard.writeText(data?.userUID)
        setUIDCopy(true)
    }


    useEffect(() => {
        const fetchUser = async () => {
            if (email) {
                setSearchInputValue(email)
                const res = await axiosPublic.get(`/api/v1/user/${email}`)
                if (res) {
                    setData(res?.data)
                    setLoading(false)
                }
            }
        }
        fetchUser()
    }, [email, axiosPublic])


    return (
        <div >
            <div className='max-w-xl flex flex-col md:flex-row justify-center items-center md:gap-10 gap-2 p-5  mt-10 mx-auto bg-purple-600'>
                <input defaultValue={searchInputValue} ref={value} className='flex-1 rounded-sm py-2 text-xl px-10' type="text" placeholder='Enter donar UID or email' />
                <button onClick={handleSearch} className='btn px-20 lg:px-10'>{loading ? <span className='loading'></span> : 'Search'}</button>
            </div>
            <div className='max-w-7xl h-screen mx-auto md:p-10' >
                {
                    loading ? <div className=" flex  justify-center mt-10 w-full">
                        <span className="loading loading-lg"></span></div> : data ? <div>
                            <div className={`${loading ? 'hidden' : ''}card-container profileCard flex md:flex-row flex-col gap-6`}>
                                <div className=" profileCard  p-5   relative  bg-white space-y-10  text-gray-600">
                                    <figure className="relative">

                                        <img className="w-[250px] h-[250px] mx-auto object-cover rounded-full" src={data?.donarImage && data?.donarImage} alt="" />


                                    </figure>
                                    <div className='space-y-2'>
                                        <div className="flex items-end  gap-4">
                                            <span className="text-3xl font-extrabold">
                                                {data ? data?.donarName : 'name: not given'} </span>

                                        </div>
                                        <p className="font-semibold"> {data?.donarEmail ? data?.donarEmail : 'email: not given'}</p>
                                        <p className="font-bold"><span className=''>Email Verify  </span> :
                                            <span className={`${data?.emailVerify ? 'text-green-600' : 'text-red-500'} pl-2`}>{data?.emailVerify ? 'verified' : 'not verified'}

                                            </span>
                                        </p>
                                        <p className="font-semibold"><span className='font-semibold'>Phone </span> : {data?.donarPhone ? data.donarPhone : 'not given'}</p>
                                        <p className="font-semibold flex items-center gap-3"><span className='font-semibold'>userID</span>: <span className=''> {data?.userUID} {
                                            UIDCopy ? <ImCheckmark onClick={handleUidCopy} className='inline ml-2 text-green-500 cursor-pointer' size={20}></ImCheckmark> : <FaCopy onClick={handleUidCopy} className='inline ml-2 text-gray-500 cursor-pointer' size={20}></FaCopy>
                                        }</span> </p>


                                        <p className="font-bold"><span className=''>Health status  </span> : <span className={`${data?.healthStatus ? 'text-green-600' : 'bg-red-500'}`}>{data?.healthStatus ? data.healthStatus : 'not given'}</span></p>
                                        <p className="font-bold"><span className=''>Recent travel history  </span> :
                                            <span className={`${data?.recentTravelHistory ? 'text-green-600' : 'text-red-500'} pl-2`}>{data?.recentTravelHistory ? data.recentTravelHistory : 'not given'}</span>
                                        </p>
                                        <p className="font-bold"><span className=''>Weight  </span> :
                                            <span className={`${data?.weight ? 'text-green-600' : 'text-red-500'} pl-2`}>{data?.weight ? `${data?.weight} kg` : 'not given'}</span>
                                        </p>
                                        <p className="font-bold"><span className=''>Profile Update status  </span> :


                                            <span className={`${data?.profileUpdateStatus ? 'text-green-600' : 'text-red-500'} pl-2`}>{data?.profileUpdateStatus ? data?.profileUpdateStatus : 'not given'}</span>

                                        </p>
                                        <p className="font-bold"><span className=''>Last donation  </span> :

                                            <span className={`${data?.lastDonation ? 'text-green-600' : 'text-red-500'} pl-2`}>{data?.lastDonation ? data?.lastDonation : 'not given'}</span>

                                        </p>
                                        <p className="font-bold"><span className=''>Medication  </span> :

                                            <span className={`${data?.lastDonation ? 'text-green-600' : 'text-red-500'} pl-2`}>{data?.medication ? data.medication : 'not given'}
                                            </span>

                                        </p>
                                        <p className="font-bold"><span className=''>Date of birth  </span> :
                                            <span className={`${data?.dateOfBirth ? 'text-green-600' : 'text-red-500'} pl-2`}>{data?.dateOfBirth ? data.dateOfBirth : 'not given'}

                                            </span>

                                        </p>


                                        <p className="mt-3 flex items-center justify-between  rounded-full"><span className='font-bold'>active status</span>:<div className={`relative h-[30px]  transition-all  w-[60px]`}>
                                            <button className={`${data?.status == 'active' ? 'bg-green-500' : data?.status == 'blocked' ? 'bg-red-500' : 'bg-gray-300'} h-full transition-all border-2  w-full border-gray-500  rounded-full`}></button>
                                            <span className={`w-[30px] h-[30px]  absolute  ${data?.status == 'active' ? 'right-[2px] ' : 'left-[2px]'} transition-all border-2 border-gray-500 bg-gray-50 rounded-full h-full`}></span>
                                        </div> </p>


                                    </div>
                                </div>
                                <div className="profileCardThird   flex-1 bg-white relative">


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

                        </div> : <div className=" flex  justify-center mt-10 w-full"><span
                            className="text-2xl font-extrabold"
                        >No user found</span></div>
                }


            </div >
            <Footer></Footer>
        </div>
    );
};

export default SearchDonar;