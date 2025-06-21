import { MdEventNote } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

const UpcomingEvents = () => {
    const notices = [
        {
            title: "Library Closed for Maintenance",
            date: "May 28, 2025",
            description: "The library will remain closed for scheduled maintenance. All due books will be auto-extended.",
        },
        {
            title: "Summer Book Fair 2025",
            date: "June 5–10, 2025",
            description: "Visit the main hall to explore new arrivals, rare collections, and get 30% off on selected books.",
        },
        {
            title: "Return Deadline for Semester Books",
            date: "July 1, 2025",
            description: "Make sure to return semester-loaned books by this date to avoid late fees.",
        },
    ];

    return (
        <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">📢 Upcoming Events / Notices</h2>
                <p className="text-gray-600 mb-10 max-w-2xl mx-auto">Stay updated with the latest announcements, events, and important notices from the library administration.</p>

                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-left">
                    {notices.map((notice, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition duration-300 p-6 space-y-4">
                            <div className="flex items-center gap-2 text-red-600 font-medium">
                                <FaCalendarAlt />
                                <span>{notice.date}</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <MdEventNote className="text-blue-600" /> {notice.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{notice.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvents;
