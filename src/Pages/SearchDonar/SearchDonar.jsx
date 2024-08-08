import blood from './../../assets/Registration/blood.png'
import { ImCheckmark } from "react-icons/im";
import { FaCopy } from "react-icons/fa";
import './SearchDonar.css'
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import { useRef, useState } from 'react';

const SearchDonar = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState()
    const axiosPublic = UseAxiosPublic()
    const value = useRef()
    console.log();

    const handleSearch = async () => {
        setLoading(true)
        const inputValue = value.current.value
        const isEmail = inputValue.indexOf('@')
        let idOrEmail;
        if(isEmail != -1){
            idOrEmail = inputValue
        }
        else{
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




    return (
        <div >
            <div className='max-w-xl flex justify-center items-center gap-10 p-5 mt-10 mx-auto bg-purple-600'>
                <input ref={value} className='flex-1 rounded-sm py-2 text-xl px-10' type="text" placeholder='Enter donar UID or email' />
                <button onClick={handleSearch} className='btn px-10'>Search</button>
            </div>
            <div className='max-w-7xl mx-auto p-10' >
                {
                    loading ? <div className=" flex  justify-center mt-10 w-full">
                        <span className="loading loading-lg"></span></div> : data ? <div>
                            <div className={`${loading ? 'hidden' : ''}card-container profileCard flex md:flex-row flex-col gap-6`}>
                                <div className=" profileCard  p-5   relative  bg-white space-y-10  text-gray-600">
                                    <figure className="relative">

                                        <img className="w-[250px] h-[250px] mx-auto rounded-full" src={data?.donarImage && data?.donarImage} alt="" />


                                    </figure>
                                    <div className='space-y-2'>
                                        <div className="flex items-end  gap-4">
                                            <span className="text-3xl font-extrabold">
                                                {data ? data?.donarName : 'name: not given'} </span>

                                        </div>
                                        <p className="font-semibold"> {data?.donarEmail ? data?.donarEmail : 'email: not given'}</p>
                                        <p className="font-semibold"><span className='font-semibold'>Phone </span> : {data?.donarPhone ? data.donarPhone : 'not given'}</p>
                                        <p className="font-semibold flex items-center gap-3"><span className='font-semibold'>userID</span>: <span className='text-red-500'> {data?.userUID} {
                                            UIDCopy ? <ImCheckmark onClick={handleUidCopy} className='inline ml-2 text-green-500 cursor-pointer' size={20}></ImCheckmark> : <FaCopy onClick={handleUidCopy} className='inline ml-2 text-gray-500 cursor-pointer' size={20}></FaCopy>
                                        }</span> </p>
                                        <p className="mt-3 flex items-center justify-between  rounded-full"><span className='font-semibold'>active status</span>:<div className={`relative h-[30px]  transition-all  w-[60px]`}>
                                            <button className={`${data?.Status == 'true' ? 'bg-green-500' : 'bg-gray-300'} h-full transition-all border-2  w-full border-gray-500  rounded-full`}></button>
                                            <span className={`w-[30px] h-[30px]  absolute  ${data?.Status == 'true' ? 'right-[2px] ' : 'left-[2px]'} transition-all border-2 border-gray-500 bg-gray-50 rounded-full h-full`}></span>
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

        </div>
    );
};

export default SearchDonar;