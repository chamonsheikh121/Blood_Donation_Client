import { useState } from "react";
import UseAllUser from "../../../../Hooks/UseAllUser";
import { ImCheckmark } from "react-icons/im";
import { FaCopy } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import SectionComponent from "../../../../Components/SectionComponent/SectionComponent";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";


const ManageUsers = () => {

    const [users, isLoading, refetch] = UseAllUser();
    const axiosSecure = UseAxiosSecure()
    const [copyUID, setUIDCopy] = useState();
    console.log(copyUID);
    const handleUidCopy = (id) => {
        navigator.clipboard.writeText(id)
        setUIDCopy(id)
    }
    const handleUserStatus = async (email, value) => {
        const doc = {
            email: email,
            userStatus: value
        }
        console.log(doc);
        const res = await axiosSecure.patch('/api/v1/userStatus', doc);
        const data = res.data;
        if (data?.modifiedCount > 0) {
            refetch()
        }
        else {
            Swal.fire('something went wrong\nplease try again')
        }
    }
    const handleUserRole = async (email, value) => {
        const doc = {
            email: email,
            userRole: value
        }
        const res = await axiosSecure.patch('/api/v1/userRole', doc);
        const data = res.data;
        if (data?.modifiedCount > 0) {
            refetch()
        }
        else {
            Swal.fire('something went wrong\nplease try again')
        }
    }


    const handleDeleteUser = (email) => {
        Swal.fire({
            title: "! Delete User !",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#b80505",
            cancelButtonColor: "#6632d0",
            cancelButtonText: 'cancel',
            confirmButtonText: "Delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/api/v1/delete-user/?email=${email}`)
                const data = res.data;
                if (data?.acknowledged === true) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User Deleted successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            }

        });
    }


    return (
        <div className="m-10" id="manageUsers" style={{ transition: '1s', opacity: '.1', transform: 'translateX(90%)' }}>
            <Helmet>
                <title>Dashboard | manage-users</title>
            </Helmet>
            <div>
                <h2 className="text-center font-bold my-10 text-3xl">Manage all users</h2>
            </div>
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-5 text-sm">
                    <p className="w-[20px] h-[20px] bg-gradient-to-b from-gray-200 to-gray-400 rounded-full "></p>
                    <p>In-active</p>
                </div>
                <div className="flex items-center gap-5 text-sm">
                    <p className="w-[20px] h-[20px] bg-gradient-to-b from-yellow-600 to-yellow-900 rounded-full "></p>
                    <p>Pending</p>
                </div>
                <div className="flex items-center gap-5 text-sm">
                    <p className="w-[20px] h-[20px] bg-gradient-to-b from-red-600 to-red-900 rounded-full "></p>
                    <p>Blocked</p>
                </div>
                <div className="flex items-center gap-5 text-sm">
                    <p className="w-[20px] h-[20px] bg-gradient-to-b from-green-600 to-green-900 rounded-full "></p>
                    <p>Active</p>
                </div>
            </div>
            <div className="mt-10 mb-2 text-2xl font-bold">Total users : {users?.length}</div>
            {
                isLoading ? <div className='w-full flex justify-center items-center mt-5'><span className="loading loading-spinner loading-lg"></span></div> : <div className="overflow-x-auto border max-h-[400px] border-gray-400 shadow-lg ">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th className="min-w-32 ">Profile</th>
                                <th className="min-w-32">Blood</th>
                                <th className="min-w-32">Notificaitons</th>
                                <th className="min-w-32">Update status</th>
                                <th className="min-w-32">User Role</th>
                                <th className="min-w-32 flex items-center justify-center
                            ">Delete user</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users?.length > 0 && users?.map(user => <tr key={user?._id}>
                                    <th>
                                        <label>
                                            <p className={`w-[30px] h-[30px] bg-gradient-to-b ${user?.status == 'blocked' ? 'from-red-600 to-red-900' : user?.status == 'active' ? 'from-green-600 to-green-900' : user?.status == 'pending' ? 'from-yellow-600 to-yellow-900' : 'from-gray-200 to-gray-400'} rounded-full`}></p>
                                        </label>
                                    </th>
                                    <td className="min-w-32">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask rounded-full h-12 w-12">
                                                    <img
                                                        src={user?.donarImage}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <Link to={`/search-donar/?email=${user?.donarEmail}`}>
                                                <div className="cursor-pointer">
                                                    <div className="font-bold hover:underline">{user?.donarName}</div>
                                                    <div className="text-sm opacity-50 hover:underline">{user?.donarEmail}</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="font-bold">{user?.BloodGroup?.group}</td>
                                    <td className="min-w-32">{user?.userUID}
                                        {
                                            copyUID == user?.userUID ? <ImCheckmark className='inline ml-2 text-green-500 cursor-pointer' size={20}></ImCheckmark> : <FaCopy onClick={() => handleUidCopy(user?.userUID)} className='inline ml-2 text-gray-500 cursor-pointer' size={20}></FaCopy>}</td>
                                    <td>
                                        <div className="flex gap-2 items-center flex-col lg:flex-row">
                                            <div className='w-full mb-2 h-[40px]'>
                                                <select defaultValue={user?.status}
                                                    onChange={(e) => handleUserStatus(user?.donarEmail, e.target.value)}
                                                    className="select  select-bordered h-full focus:outline-none select-sm w-full ">

                                                    {/* <option  className="py-10" value="">{user?.status}</option> */}
                                                    <option value="blocked">Block</option>
                                                    <option value="active">Active</option>

                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex gap-2 items-center flex-col lg:flex-row">
                                            <div className='w-full mb-2 h-[40px]'>
                                                <select
                                                    defaultValue={user?.userRole}
                                                    onChange={(e) => handleUserRole(user?.donarEmail, e.target.value)}
                                                    className="select  select-bordered h-full focus:outline-none select-sm w-full ">

                                                    <option value="volunteer">Volunteer</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="donar">Donar</option>


                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="flex items-center justify-center">
                                        <button onClick={() => handleDeleteUser(user?.donarEmail)} className="btn btn-sm bg-red-600 text-white hover:bg-red-800">Delete</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                        {/* foot */}
                        <tfoot>

                        </tfoot>
                    </table>
                </div>
            }
            <SectionComponent id={'manageUsers'} from={'translateX'}></SectionComponent>
        </div>
    );
};

export default ManageUsers;