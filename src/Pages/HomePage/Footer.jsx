import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const subcriptionInputEmail = useRef();
    const [loading, setLoading] = useState(false);

    const handleMessageSend = () => {
        setLoading(true);
        const email = subcriptionInputEmail.current.value;
        setTimeout(() => {
            alert(`Subscribed with ${email}`);
            setLoading(false);
            subcriptionInputEmail.current.value = "";
        }, 1000);
    };

    return (
        <div className="bg-green-800 text-neutral-content">
            <footer className="footer flex flex-col lg:flex-row justify-between gap-10 py-20 px-4 md:px-20">
                {/* Logo and Contact Info */}
                <nav className="space-y-4 max-w-sm">
                    <svg
      width={80}
      height={80}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Library Logo"
    >
      {/* Book shape */}
      <rect x="8" y="12" width="48" height="40" rx="4" ry="4" stroke={"#1f2937"} strokeWidth="3" fill="#f9fafb" />
      
      {/* Pages lines */}
      <line x1="20" y1="20" x2="44" y2="20" stroke={"#1f2937"} strokeWidth="2" />
      <line x1="20" y1="28" x2="44" y2="28" stroke={"#1f2937"} strokeWidth="2" />
      <line x1="20" y1="36" x2="44" y2="36" stroke={"#1f2937"} strokeWidth="2" />
      <line x1="20" y1="44" x2="44" y2="44" stroke={"#1f2937"} strokeWidth="2" />

      {/* Spine */}
      <rect x="8" y="12" width="6" height="40" fill={"#1f2937"} />
    </svg>
                    <div className="text-sm text-gray-300 space-y-1">
                        <p>Tel: <a href="tel:+8801304100074" className="link link-hover">01304100074</a></p>
                        <p>Email: <a href="mailto:info@librarysystem.com" className="link link-hover">info@librarysystem.com</a></p>
                        <p>Address:</p>
                        <address>220 Green House, Purbo Noyatola, Moghbazar, Dhaka</address>
                    </div>
                </nav>

                {/* Quick Links */}
                <nav>
                    <h6 className="footer-title border-b-4 pb-2 mb-2">Quick Links</h6>
                    <ul className="space-y-2">
                        <li><Link to="/" className="link lg:text-lg link-hover">Home</Link></li>
                        <li><Link to="/catalog" className="link lg:text-lg link-hover">Book Catalog</Link></li>
                        <li><Link to="/events" className="link lg:text-lg link-hover">Events & Notices</Link></li>
                        <li><Link to="/blogs" className="link lg:text-lg link-hover">Blog</Link></li>
                    </ul>
                </nav>

                {/* About Section */}
                <nav>
                    <h6 className="footer-title border-b-4 pb-2 mb-2">About Our Library</h6>
                    <ul className="space-y-2">
                        <li><a className="link lg:text-lg link-hover">About Us</a></li>
                        <li><a className="link lg:text-lg link-hover">Membership Policy</a></li>
                        <li><a className="link lg:text-lg link-hover">Terms of Use</a></li>
                        <li><a className="link lg:text-lg link-hover">Privacy Policy</a></li>
                    </ul>
                </nav>

                {/* Subscribe Section */}
                <nav className="space-y-3 w-full max-w-sm">
                    <p className="font-semibold text-sm">Subscribe to Updates:</p>
                    <input
                        ref={subcriptionInputEmail}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-2 rounded text-black"
                    />
                    <button
                        onClick={handleMessageSend}
                        className="btn w-full bg-yellow-600 text-white hover:bg-yellow-700"
                    >
                        {loading ? <span className="loading loading-spinner loading-sm"></span> : "Subscribe"}
                    </button>
                </nav>
            </footer>

            {/* Bottom copyright */}
            <div className="text-center text-sm pb-5">
                <p>© 2024 City Library Management System. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
