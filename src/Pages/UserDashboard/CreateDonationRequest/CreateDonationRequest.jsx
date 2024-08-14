import { useState } from "react";
import UseAuthContext from "../../../Hooks/UseAuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import UseUser from "../../../Hooks/UseUser";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import SectionComponent from "../../../Components/SectionComponent/SectionComponent";
import { Helmet } from "react-helmet";

const CreateDonationRequest = () => {

    const { user, bloodGroups, divisions, districts, upazilas } = UseAuthContext()
    const [data] = UseUser()
    const [selectedBloodGroup, setSelectedBloodGroup] = useState();
    const [selectedDivision, setSelectedDivision] = useState()
    const [selectedDistrict, setSelectedDistrict] = useState()
    const [selectedUpazila, setSelectedUpazila] = useState()
    const [loading, setLoading] = useState(false)
    const axiosPublic = UseAxiosPublic()

    const handleSubmitRequest = async (e) => {
        e.preventDefault()
        if (data?.Status != 'true') {
            Swal.fire({
                position: "center",
                icon: "question",
                title: `For requesting blood!!\n you must be "active"`,
                showConfirmButton: false,
                showCancelButton: true
            });
            return
        }
        setLoading(true)
        const form = new FormData(e.currentTarget);
        const recipientName = form.get('RecipientName')
        const hospitalName = form.get('HospitalName')
        const date = form.get('date');
        const time = form.get('time');
        const phone = form.get('phone')
        const fullAddress = form.get('fullAddress')
        const requesterMessage = form.get('requesterMessage');
        const photo = form.get('file');
        if (!selectedBloodGroup || !selectedDivision || !selectedDistrict || !selectedUpazila) {
            alert('please make sure you have selected : \nblood-group ,\nDivision ,\nDistrict and \nUpazila')
            setLoading(false)
            return
        }
        const image = { 'image': photo };
        const api_key = 'f6a950227b2e6c0fda979d39facb73d8';
        const api = `https://api.imgbb.com/1/upload?key=${api_key}`
        const res = await axios.post(api, image, {
            headers:
            {
                'content-type': 'multipart/form-data'
            }
        })
        if (res?.data?.success) {

            console.log(res?.data.data);

            const RequestInfo = {
                donarName: data?.donarName || null,
                donarImage: data?.donarImage || null,
                donarEmail: user?.email || null,
                requesterName: recipientName || null,
                requestedBloodGroup: selectedBloodGroup || null,
                requesterDivision: selectedDivision || null,
                requesterDistrict: selectedDistrict || null,
                requesterUpazila: selectedUpazila || null,
                requesterHospital: hospitalName || null,
                requestedDate: date || null,
                requestedTime: time || null,
                requesterPhone: phone || null,
                requesterFullAddress: fullAddress || null,
                requesterMessage: requesterMessage || null,
                requesterImage: res?.data?.data?.display_url || null,
                status: 'pending'

            }
            if (user?.email) {
                const infoRes = await axiosPublic.post('/api/v1/all-request', RequestInfo)
                const data = infoRes?.data
                if (data?.acknowledged) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Submitted successfully",
                        showConfirmButton: false,
                        timer: 2000
                    });

                    setLoading(false)
                    e.target.reset()
                }
                else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Oops ! Failed to submit",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setLoading(false)
                }

            }

        }
        else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Oops ! failed to update file",
                showConfirmButton: false,
                timer: 2000
            });
        }

    }


    return (
        <div>
            <Helmet>
                <title> Dashboard | create & publish</title>
            </Helmet>
            <form onSubmit={handleSubmitRequest} className="bg-white max-w-5xl space-y-5 mt-10 rounded-md p-10 text-gray-700 mx-auto">
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="RequesterName">Requester name:</label>
                        <input defaultValue={data?.donarName} disabled type="text" name="" className="py-2 border  bg-gray-300 placeholder:text-gray-500 pl-5 cursor-not-allowed focus:bg-white " required placeholder="Name" id="RequesterName" style={{ opacity: .1, transition: '1s', transform: 'translateX(-90%)' }} />
                    </div>
                    <div className="flex flex-1 flex-col justify-center gap-2">
                        <label htmlFor="RequesterName">Requester email:</label>
                        <input defaultValue={user?.email} disabled type="email" name="" className="py-2 border bg-gray-300 placeholder:text-gray-500 cursor-not-allowed  pl-5 focus:bg-white " required placeholder="Email" id="RequesterEmail" style={{ opacity: .1, transition: '1s', transform: 'translateX(90%)' }} />
                    </div>
                </div>



                <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="RecipientName">Recipient name:</label>
                        <input type="text" name="RecipientName" className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white " required placeholder="Name" id="RecipientName" style={{ opacity: .1, transition: '1s', transform: 'translateX(-90%)' }} />
                    </div>
                    <div className="flex flex-1 flex-col justify-center gap-2">
                        <label htmlFor="HospitalName">Hospital name:</label>
                        <input type="text" name="HospitalName" className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white " required placeholder="Hospital name" id="HospitalName" style={{ opacity: .1, transition: '1s', transform: 'translateX(90%)' }} />
                    </div>
                </div>



                <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="bloodGroup">Blood group:</label>
                        <select id="bloodGroup" required onChange={(e) => setSelectedBloodGroup(JSON.parse(e.target.value))} className={`py-2 ${selectedBloodGroup ? 'border' : 'border-red-700 border'} bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white`} style={{ opacity: .1, transition: '1s', transform: 'translateX(-90%)' }}>
                            <option disabled selected>Select blood</option>
                            {
                                bloodGroups?.length > 0 && bloodGroups.map((bloodGroup, i) => <option key={i}
                                    value={JSON.stringify(bloodGroup.group)}
                                >{bloodGroup.group}</option>)
                            }

                        </select>
                        <SectionComponent id={'bloodGroup'} from={'translateX'}></SectionComponent>
                    </div>
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="division">Division :</label>
                        <select id="division" required onChange={(e) => setSelectedDivision(JSON.parse(e.target.value))} className={`py-2 ${selectedDivision ? 'border' : 'border border-red-700'} bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white`} style={{ opacity: .1, transition: '1s', transform: 'translateY(-200%)' }}>
                            <option disabled selected>Select Division</option>
                            {
                                divisions?.length > 0 && divisions.map(division => <option key={division.id}
                                    value={JSON.stringify(division)}
                                >{division?.bn_name}, {division?.name}</option>)
                            }

                        </select>
                        <SectionComponent id={'division'} from={'translateY'}></SectionComponent>

                    </div>
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="district">District :</label>
                        <select id="district" required onChange={(e) => setSelectedDistrict(JSON.parse(e.target.value))} className={`py-2 ${selectedDistrict ? 'border' : 'border border-red-700'} bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white`} style={{ opacity: .1, transition: '1s', transform: 'translateX(90%)' }}>
                            <option disabled selected>Select District</option>
                            {
                                districts?.length > 0 && districts.map(district => {
                                    {
                                        if (district?.division_id == selectedDivision?.id) {
                                            return <option key={district.id}
                                                value={JSON.stringify(district)}
                                            >{district.bn_name}, {district.name}</option>
                                        }

                                    }
                                })
                            }

                        </select>
                        <SectionComponent id={'district'} from={'translateX'}></SectionComponent>

                    </div>
                </div>



                <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="upazila">Upazila:</label>
                        <select id="upazila" required onChange={(e) => setSelectedUpazila(JSON.parse(e.target.value))} className={`py-2 ${selectedUpazila ? 'border' : 'border border-red-700'} bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white`} style={{ opacity: .1, transition: '1s', transform: 'translateX(-90%)' }}>
                            <option disabled selected>Select upazila</option>
                            {
                                upazilas?.length > 0 && upazilas.map(upazila => {
                                    {
                                        if (upazila?.district_id == selectedDistrict?.id) {
                                            return <option key={upazila.id}
                                                value={JSON.stringify(upazila)}
                                            >{upazila?.bn_name}, {upazila?.name} </option>
                                        }

                                    }
                                })
                            }

                        </select>
                        <SectionComponent id={'upazila'} from={'translateX'}></SectionComponent>

                    </div>
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="date">Donation date:</label>
                        <input type="date" name="date" className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white " required placeholder="Name" id="date" style={{ opacity: .1, transition: '1s', transform: 'translateY(-200%)' }} />
                        <SectionComponent id={'date'} from={'translateY'}></SectionComponent>

                    </div>
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="time">Donation time:</label>
                        <input type="time" name="time" className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white " required placeholder="Name" id="time" style={{ opacity: .1, transition: '1s', transform: 'translateX(90%)' }} />
                        <SectionComponent id={'time'} from={'translateX'}></SectionComponent>

                    </div>
                </div>



                <div className="flex flex-col md:flex-row gap-10">

                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="Phone">Phone No:</label>
                        <input type="number" name="phone" className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white " required placeholder="Phone number" id="Phone" style={{ opacity: .1, transition: '1s', transform: 'translateX(-90%)' }} />
                        <SectionComponent id={'Phone'} from={'translateX'}></SectionComponent>

                    </div>
                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="FullAddress">Hospital Full Address :</label>
                        <input type="text" name="fullAddress" className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white " required placeholder="Address" id="FullAddress" style={{ opacity: .1, transition: '1s', transform: 'translateX(90%)' }} />
                        <SectionComponent id={'FullAddress'} from={'translateX'}></SectionComponent>

                    </div>

                </div>



                <div className="flex gap-10">

                    <div className="flex flex-col flex-1 justify-center gap-2">
                        <label htmlFor="TextArea">Request message:</label>
                        <textarea name="requesterMessage" id="requesterMessage" required placeholder="why do you need blood describe in this input field
in details"  className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white h-[100px]"
                            style={{ opacity: .1, transition: '1s', transform: 'translateY(90%)' }}></textarea>
                        <SectionComponent id={'requesterMessage'} from={'translateY'}></SectionComponent>

                    </div>


                </div>



                <div className="flex flex-col items-center gap-2 md:items-start">
                    <label htmlFor="file">Photo :</label>
                    <input type="file" name="file" id="file" className="py-2 border bg-gray-300 placeholder:text-gray-500 pl-5 focus:bg-white" style={{ opacity: .1, transition: '1s', transform: 'translateX(-90%)' }} />
                    <SectionComponent id={'file'} from={'translateX'}></SectionComponent>


                </div>

                <div className="max-w-md mx-auto">
                    <button className=" border hover:bg-red-800 bg-red-700 w-full py-2 text-white btn">{loading ? <span className="loading"></span> : 'Publish Request'}</button>
                </div>


            </form>
            <SectionComponent id={'RequesterName'} from={'translateX'}></SectionComponent>
            <SectionComponent id={'RequesterEmail'} from={'translateX'}></SectionComponent>
            <SectionComponent id={'RecipientName'} from={'translateX'}></SectionComponent>
            <SectionComponent id={'HospitalName'} from={'translateX'}></SectionComponent>

        </div>
    );
};

export default CreateDonationRequest;