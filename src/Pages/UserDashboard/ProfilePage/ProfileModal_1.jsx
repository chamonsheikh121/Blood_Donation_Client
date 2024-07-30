

const ProfileModal_1 = ({data,setUpdatedImage,setSaveActive, setUpdatedName, setUpdatedPhone,setActiveStatus, saveActive, handleFormSubmit, loading}) => {

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
                            className="file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={(e) => {
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
                        <input defaultValue={data?.donarPhone} type="text" placeholder="Phone number" id="userPhone" name='userPhone' className="input focus:outline-none focus:border-black input-bordered" required onKeyUp={(e) => {
                            setUpdatedPhone(e.target.value);
                            setSaveActive(true)
                        }} />
                    </div>
                    <select onChange={(e) => {
                        setActiveStatus(e.target.value);
                        setSaveActive(true)
                    }} className="select select-info w-full max-w-xs">
                        <option defaultValue={data?.Status} disabled selected>Status</option>
                        <option value={true}>Active</option>
                        <option value={false}>InActive</option>

                    </select>


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