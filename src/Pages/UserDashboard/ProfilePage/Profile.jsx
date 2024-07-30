import image from './../../../assets/blogs/blog1.jpg'
import blood from './../../../assets/Registration/blood.png'
import { MdEdit } from "react-icons/md";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import UseUser from "../../../Hooks/UseUser";
import { useState } from 'react';
import ProfileModal_1 from './ProfileModal_1';
import { DNA } from 'react-loader-spinner';




const Profile = () => {

    const [data, refetch] = UseUser();
    const [loading, setLoading] = useState(false)
    const [updatedName, setUpdatedName] = useState('')
    const [updatedImage, setUpdatedImage] = useState(null);
    const [activeStatus, setActiveStatus] = useState(data?.Status)
    const [updatedPhone, setUpdatedPhone] = useState(data?.donarPhone)
    const [saveActive, setSaveActive] = useState(false)
    const axiosPublic = UseAxiosPublic()

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const API_KEY = 'f6a950227b2e6c0fda979d39facb73d8';
        const api = `https://api.imgbb.com/1/upload?key=${API_KEY}`
        if (updatedImage) {
            const image = { 'image': updatedImage }
            console.log(image);
            const res = await axiosPublic.post(api, image, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })

            const profileUpdate = {
                donarEmail: data?.donarEmail,
                donarImage: res?.data?.data?.display_url || null,
                donarName: updatedName || null,
                status: activeStatus || null,
                donarPhone: updatedPhone || null
            }
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
        }
        else {
            const profileUpdate = {
                donarEmail: data?.donarEmail,
                donarName: updatedName || null,
                status: activeStatus || null,
                donarPhone: updatedPhone || null
            }
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
        }

    }

    // const handleProfileDetailsSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(e);
    // }


    return (
        <div className="p-10">

            {data ? <div>
                <div className="flex gap-6">
                    <div className=" p-5   relative  bg-white space-y-10  text-gray-600">
                        <figure className="relative">

                            <img className="w-[250px] h-[250px] mx-auto rounded-full" src={data?.donarImage ? data?.donarImage : image} alt="" />
                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <button className="btn btn-sm absolute top-0 right-0" onClick={() => document.getElementById('my_modal_1').showModal()}><MdEdit size={20}></MdEdit></button>
                            <ProfileModal_1
                                data={data}
                                setUpdatedImage={setUpdatedImage}
                                setSaveActive={setSaveActive}
                                setUpdatedName={setUpdatedName}
                                setUpdatedPhone={setUpdatedPhone}
                                setActiveStatus={setActiveStatus}
                                saveActive={saveActive}
                                loading={loading}
                                handleFormSubmit={handleFormSubmit}></ProfileModal_1>
                        </figure>
                        <div>
                            <div className="flex items-end  gap-4">
                                <span className="text-3xl font-extrabold">
                                    {data ? data?.donarName : 'name: not given'} </span>

                            </div>
                            <p className="font-semibold"> {data?.donarEmail ? data?.donarEmail : 'email: not given'}</p>
                            <p className="font-semibold">Phone : {data?.donarPhone ? data.donarPhone : 'not given'}</p>
                            <p className="mt-3 flex items-center justify-between border p-2 rounded-full">active status:  <div className={` relative h-[30px] cursor-pointer transition-all  w-[60px]`}>
                                <button className={`${data?.Status == 'true' ? 'bg-green-500' : 'bg-gray-300'} h-full transition-all border-2  w-full border-gray-500  rounded-full`}></button>
                                <span className={`w-[30px] h-[30px]  absolute  ${data?.Status == 'true' ? 'right-[2px] ' : 'left-[2px]'} transition-all border-2 border-gray-500 bg-gray-50 rounded-full h-full`}></span>
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
                                    <p>Antigens : {data?.BloodGroup?.antigens?.map(antigen => <span className="px-2" key={antigen}>{antigen}</span>)}</p>
                                    <p>Antibodies : {data?.BloodGroup?.antibodies?.map(antibodie => <span className="px-2" key={antibodie}>{antibodie}</span>)}</p>
                                    <p>CanDonateTo : {data?.BloodGroup?.canDonateTo?.map(canDonate => <span className="px-2" key={canDonate}> {canDonate} </span>)}</p>
                                    <p>CanReceiveFrom : {data?.BloodGroup?.canReceiveFrom?.map(canReceive => <span className="px-2" key={canReceive}> {canReceive} </span>)}</p>
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

                <div className="">
                    <p className="text-3xl font-bold mt-20 mb-5 text-center  text-gray-600">My recent donation:</p>
                    <div className="grid grid-cols-3 gap-10 mx-10">
                        <div className="h-[250px] bg-green-700"></div>
                        <div className="h-[250px] bg-green-700"></div>
                        <div className="h-[250px] bg-green-700"></div>
                    </div>
                </div>
                <div className="">
                    <p className="text-3xl font-bold mt-20 mb-5 text-center  text-gray-600">My recent request&apos;s:</p>
                    <div className="grid grid-cols-3 gap-10 mx-10">
                        <div className="h-[250px] bg-green-700"></div>
                        <div className="h-[250px] bg-green-700"></div>
                        <div className="h-[250px] bg-green-700"></div>
                    </div>
                </div>
            </div> : <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />}
        </div >
    );
};

export default Profile;