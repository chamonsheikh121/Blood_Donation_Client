

const ContactUs = () => {
    return (
        <section className="min-h-screen bg-gray-50 text-gray-800 py-10 px-5 md:px-20">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold mb-2 text-center text-green-700">Contact Us</h2>
                <p className="text-center text-gray-600 mb-10">We're here to answer any questions you may have.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Form */}
                    <form className="bg-white p-8 rounded shadow-md space-y-4">
                        <div>
                            <label className="block font-semibold mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full p-3 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-3 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Subject</label>
                            <input
                                type="text"
                                placeholder="Enter subject"
                                className="w-full p-3 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Message</label>
                            <textarea
                                placeholder="Your message"
                                rows="5"
                                className="w-full p-3 border border-gray-300 rounded"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800 transition"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Contact Info & Map */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded shadow-md">
                            <h4 className="text-xl font-semibold mb-2">Contact Details</h4>
                            <p><strong>Phone:</strong> <a href="tel:+8801304100074" className="text-green-700">+8801304100074</a></p>
                            <p><strong>Email:</strong> <a href="mailto:sheikh@gamil.com" className="text-green-700">sheikh@gamil.com</a></p>
                            <p><strong>Address:</strong> 220 Green House, Purbo Noyatola, Moghbazar, Dhaka</p>
                        </div>

                        <div className="w-full h-64 rounded overflow-hidden shadow-md">
                            {/* You can replace this src with your actual Google Map embed link */}
                            <iframe
                                title="Map"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Moghbazar,Dhaka"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
