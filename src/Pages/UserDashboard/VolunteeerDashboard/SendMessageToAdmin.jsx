import { Helmet } from "react-helmet";
import UseUser from "../../../Hooks/UseUser";

import { useState } from "react";
import Swal from "sweetalert2";
import UseMessage from "../../../Hooks/UseMessage";
import UseAuthContext from "../../../Hooks/UseAuthContext";
import MessageCard from "../../../Components/Shared/MessageCard";
import { UseDateConverter } from './../../../Hooks/UseDateConverter';
import SectionComponent from "../../../Components/SectionComponent/SectionComponent";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";



const SendMessageToAdmin = () => {
    const [myData] = UseUser()
    const { user } = UseAuthContext()
    const axiosPublic = UseAxiosPublic()
    const [loading, setLoading] = useState(false)
    const [messages, isLoading, refetch] = UseMessage(user?.email);
    console.log(messages);


    const handleMessageSend = async (e) => {
        e.preventDefault()
        setLoading(true)
        const form = new FormData(e.currentTarget);
        const name = myData?.donarName;
        const date = new Date()
        const convertedDate = UseDateConverter(date)
        const time = date.toLocaleTimeString('en-US', { minute: '2-digit', hour: '2-digit' })
        const email = myData?.donarEmail;
        const messageTitle = form.get('messageTitle');
        const message = form.get('message');
        const messageObject = {
            name: name,
            email: email,
            messageTitle: messageTitle,
            message: message,
            status: 'notChecked',
            date: convertedDate,
            time: time
        }
        const res = await axiosPublic.post('/api/v1/post-message', messageObject)
        const data = res.data;
        if (data?.acknowledged === true) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Message send successfully",
                showConfirmButton: false,
                timer: 1500
            });
            refetch()
            setLoading(false)
            e.target.reset()
        }
    }


    return (
        <div className="m-10">
            <Helmet>
                <title>Dashboard | send-message</title>
            </Helmet>
            <h1 className="text-center font-bold text-gray-600 text-3xl mb-10">Send message to admin</h1>

            <form onSubmit={handleMessageSend} id="messageForm" style={{ opacity: .1, transition: '1s', transform: 'translateX(90%)' }} className="bg-white space-y-10 p-5 max-w-4xl mx-auto">
                <div className="flex  items-center gap-5">
                    <div className="w-full">
                        <label htmlFor="send-userName" className="text-sm block mb-2">Name : </label>
                        <input
                            id="send-userName"
                            type="text"
                            defaultValue={myData?.donarName}
                            disabled
                            className="input input-bordered input-success w-full " />
                    </div>
                    <div className="w-full">
                        <label htmlFor="send-userEmail" className="text-sm block mb-2">Email : </label>
                        <input
                            id="send-userEmail"
                            type="text"
                            defaultValue={myData?.donarEmail}
                            disabled
                            className="input input-bordered input-success w-full " />
                    </div>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Message subject / heading / title"
                        required
                        name="messageTitle"
                        className="input input-bordered input-success w-full" />
                </div>
                <div>
                    <textarea
                        className="w-full  min-h-40 p-5 border rounded-md focus:outline-green-600 border-green-600"
                        name="message"
                        placeholder="message box"
                    ></textarea>
                </div>
                <div className="flex items-center justify-center">
                    <button className="btn bg-green-700 hover:bg-green-800 text-white max-w-72  w-full">
                        {loading ? <span className="loading"></span> : 'Send'}</button>
                </div>
            </form>

            <div>
                <h1 className=" font-bold text-gray-600 text-3xl my-10">My messages</h1>
                <div id="myMessages" style={{ opacity: .1, transition: '1s', transform: 'translateX(-90%)' }} className="max-w-4xl space-y-10 mx-auto">
                    {
                        isLoading ? <div className="w-full mt-5 flex justify-center items-center"><span className="loading loading-lg"></span></div> : messages?.length > 0 ? messages?.map(message =>
                            <MessageCard
                                key={message?._id}
                                messageData={message}
                            ></MessageCard>) :

                            <div className="w-full mt-5 flex justify-center items-center text-xl text-center font-bold"><span>No message found</span></div>
                    }

                </div>

            </div>
            <SectionComponent id={'messageForm'} from={'translateX'}></SectionComponent>
            <SectionComponent id={'myMessages'} from={'translateX'}></SectionComponent>
        </div>
    );
};

export default SendMessageToAdmin;