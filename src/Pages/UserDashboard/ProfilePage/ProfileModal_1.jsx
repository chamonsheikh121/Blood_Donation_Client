import PropTypes from 'prop-types';

const ProfileModal_1 = ({ data,
    setUpdatedImage,
    setSaveActive,
    setUpdatedName,
    phoneInputValue,
    setActiveStatus,
    saveActive,
    handleFormSubmit,
    loading,
    healthInputValue,
    travelInputValue,
    weightInputValue,
    lastDonationInputValue,
    medicationInputValue,
    dateOfBirthInputValue,
}) => {

    return (
        <dialog id="my_modal_1" className="modal ">
            <div className="modal-box">
                <form className=" space-y-5">
                    {
                        data?.donarImage && <img className="w-[100px] h-[100px] mx-auto rounded-full bg-gray-600" src={data?.donarImage} alt="" />
                    }
                    <div className="flex flex-col justify-center">
                        <label htmlFor="userName" className="mb-2">Update your image :</label>
                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-primary w-full " onChange={(e) => {
                                setUpdatedImage(e.target.files[0]);
                                setSaveActive(true)
                            }} />
                    </div>

                    <div className="form-control">
                        <label htmlFor="userName" className="mb-2">Update your Name :</label>
                        <input defaultValue={data?.donarName} type="text" placeholder="Your name" id="userName" name='userName' className="input focus:outline-none focus:border-black input-bordered" required onKeyUp={(e) => {
                            setUpdatedName(e.target.value);
                            setSaveActive(true)
                        }} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="userPhone" className="mb-2">Update your Phone :</label>
                        <input ref={phoneInputValue} defaultValue={data?.donarPhone} type="text" placeholder="Phone number" id="userPhone" name='userPhone' className="input focus:outline-none focus:border-black input-bordered" required onKeyUp={() => setSaveActive(true)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="userHealthStatus" className="mb-2">Health status :</label>
                        <input ref={healthInputValue} defaultValue={data?.healthStatus} type="text" placeholder="okay  / not okay" id="userHealth" name='userHealthStatus' className="input focus:outline-none focus:border-black input-bordered" required onKeyUp={() => setSaveActive(true)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="userRecentTravelHistory" className="mb-2">Recent travel history :</label>
                        <input ref={travelInputValue} defaultValue={data?.recentTravelHistory} type="text" placeholder="yes, where and date  / no" id="userRecentTravelHistory" name='userRecentTravelHistory' className="input focus:outline-none focus:border-black input-bordered" required onKeyUp={() => setSaveActive(true)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="userWeight" className="mb-2">Weight :</label>
                        <input ref={weightInputValue} defaultValue={data?.weight} type="number" placeholder="Your weight ( kg )" id="userWeight" name='userWeight' className="input focus:outline-none focus:border-black input-bordered" required onKeyUp={() => setSaveActive(true)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="userLastDonation" className="mb-2">Last donation date :</label>
                        <input ref={lastDonationInputValue} defaultValue={data?.lastDonation} type="date" placeholder="" id="userLastDonation" name='userLastDonation' className="input focus:outline-none focus:border-black input-bordered" required onChange={() => setSaveActive(true)} />
                    </div>

                    <div className="form-control">
                        <div className="form-control tooltip tooltip-close tooltip-bottom" data-tip="List any medications you are currently taking or have recently taken (e.g., insulin, antibiotics, drugs).">
                            <label htmlFor="userMedication" className="mb-2  w-full block text-start">Medication :</label>
                        </div>
                        <input ref={medicationInputValue} defaultValue={data?.medication} type="text" placeholder="E.g., insulin, antibiotics, vitamins" id="userMedication" name='userMedication' className="input focus:outline-none focus:border-black input-bordered" required onKeyUp={() => setSaveActive(true)} />
                    </div>


                    <div className="form-control">
                        <label htmlFor="userDateOfBirth" className="mb-2">Date of birth :</label>
                        <input ref={dateOfBirthInputValue} defaultValue={data?.dateOfBirth} type="date" placeholder="" id="userDateOfBirth" name='userDateOfBirth' className="input focus:outline-none focus:border-black input-bordered" required onChange={() => setSaveActive(true)} />
                    </div>





                    <div className='form-control'>
                        <label htmlFor="">Active Status :</label>
                        <select onChange={(e) => {
                            setActiveStatus(e.target.value);
                            setSaveActive(true)
                        }} className="select select-info w-full ">
                            <option defaultValue={data?.Status} disabled selected>Status</option>
                            <option value={true}>Active</option>
                            <option value={false}>InActive</option>

                        </select>
                    </div>


                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <span disabled={!saveActive} onClick={handleFormSubmit} className=" bg-red-700  text-white mr-5 hover:bg-red-800 btn px-10">{loading ? <span className="loading loading-spinner text-white"></span> : 'save'}</span>
                        <button onClick={() => setSaveActive(false)} className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default ProfileModal_1;
ProfileModal_1.propTypes = {
    data: PropTypes.node,
    setUpdatedImage: PropTypes.node,
    setSaveActive: PropTypes.node,
    setUpdatedName: PropTypes.node,
    phoneInputValue: PropTypes.node,
    saveActive: PropTypes.node,
    handleFormSubmit: PropTypes.node,
    loading: PropTypes.node,
    setActiveStatus: PropTypes.node,
    healthInputValue: PropTypes.node,
    travelInputValue: PropTypes.node,
    weightInputValue: PropTypes.node,
    lastDonationInputValue: PropTypes.node,
    medicationInputValue: PropTypes.node,
    dateOfBirthInputValue: PropTypes.node,

}