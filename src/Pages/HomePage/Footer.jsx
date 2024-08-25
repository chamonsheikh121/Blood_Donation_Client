import { Link } from "react-router-dom";
import UseAuthContext from "../../Hooks/UseAuthContext";
import img from './../../assets/logo.png'
import SectionComponent from "../../Components/SectionComponent/SectionComponent";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const Footer = () => {
    const { user } = UseAuthContext()
    const [loading, setLoading] = useState(false)
    const subcriptionInputEmail = useRef();
    const handleMessageSend = () => {
        if (!subcriptionInputEmail.current.value) {
            alert('please input your email')
            return
        }
        setLoading(true);
        setTimeout(() => {
            Swal.fire({
                title: "Thank you for Subscribe",
                icon: "success"
            });
            setLoading(false)
            subcriptionInputEmail.current.value = ''
        }, 2000);
    }
    return (
        <div
            id="footer"
            style={{ opacity: '.1', transition: '1s', transform: 'translateY(50%)' }}
            className="bg-neutral text-neutral-content">
            <footer className="footer  text-neutral-content py-20 px-2 md:p-20">
                <nav className=" w-full space-y-4">
                    <img className="w-full h-[100px]  md:w-[250px] md:h-[150px] object-fill" src={img} alt="" />
                    <div className="">
                        <p>Tel : <a href="tel:+8801304100074" className="link link-hover">01304100074</a></p>
                        <a href="mailto:sheikhchamon9@gamil.com" className="link link-hover">sheikh@gamil.com</a>
                        <p>Email : </p>
                        <p>Address : <address>220 green house, purbo noyatola, mogbazar Dhaka</address>
                        </p>
                    </div>
                </nav>
                <nav>
                    <h6 className="footer-title border-b-4 pb-2">Quick Links</h6>
                    <Link to={'/'}><a className="link lg:text-lg link-hover">Home</a></Link>
                    <Link to={'/all-blood-donation-request'}><a className="link lg:text-lg link-hover">All donation Requests</a></Link>
                    <Link to={'/funding'}><a className="link lg:text-lg link-hover">Funding</a></Link>
                    <Link to={'/blogs'}><a className="link lg:text-lg link-hover">Blogs</a></Link>
                    {user && <a className="link lg:text-lg link-hover"></a>}
                </nav>
                <nav>
                    <h6 className="footer-title border-b-4 pb-2">About Blood donation</h6>
                    <a className="link  lg:text-lg link-hover">About us</a>
                    <a className="link lg:text-lg link-hover">Cookie policy</a>
                    <a className="link lg:text-lg link-hover">Terms of use</a>
                    <a className="link lg:text-lg link-hover">Privacy policy</a>
                </nav>
                <nav className="w-full space-y-2">
                    <Link to={user ? '/all-blood-donation-request' : '/registration'}><button className="btn px-10 bg-red-600 border-none text-white hover:bg-red-700">Donate now</button></Link>
                    <span>Subscribe : </span>
                    <input type="email" ref={subcriptionInputEmail} placeholder="Subscribe by your email" className={`w-full text-lg text-gray-800 p-1  py-2 rounded-sm `} />
                    <button onClick={handleMessageSend} className="w-2/4 mx-auto btn">{loading ? <span className="loading"></span> : 'Subscribe'}</button>
                </nav>

            </footer>
            <div className="text-center text-sm pb-5">
                <p>© 2024 Blood Donation Organization [ by Chamon ali ]. All rights reserved.</p>
            </div>
            <SectionComponent id={'footer'} from={'translateY'}></SectionComponent>
        </div>
    );
};

export default Footer;