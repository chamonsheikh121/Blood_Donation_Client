import { MdLibraryBooks, MdOutlineHistoryEdu } from "react-icons/md";
import { FaUserShield, FaBell, FaBookReader } from "react-icons/fa";
import { TbBooks } from "react-icons/tb";

const FeaturesOverview = () => {
    const features = [
        {
            icon: <MdLibraryBooks size={40} className="text-blue-600" />,
            title: "Smart Book Catalog",
            description: "Easily browse, search, and filter books by title, author, category, or availability."
        },
        {
            icon: <FaBookReader size={40} className="text-green-600" />,
            title: "Borrow & Return System",
            description: "Students can request and return books online with real-time tracking."
        },
        {
            icon: <MdOutlineHistoryEdu size={40} className="text-purple-600" />,
            title: "Borrowing History",
            description: "View complete records of borrowed and returned books anytime."
        },
        {
            icon: <FaUserShield size={40} className="text-red-600" />,
            title: "Role-Based Access",
            description: "Separate functionalities for students and admins to ensure secure operations."
        },
        {
            icon: <TbBooks size={40} className="text-yellow-600" />,
            title: "Inventory Management",
            description: "Admins can add, update, or remove books with ease using a powerful dashboard."
        },
        {
            icon: <FaBell size={40} className="text-pink-600" />,
            title: "Notifications & Alerts",
            description: "Automatic alerts for due dates, overdue books, or new arrivals."
        },
    ];

    return (
        <div className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">🛠️ Features Overview</h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Explore the powerful features that make our Library Management System efficient and user-friendly for both students and administrators.</p>

                <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white shadow-md p-8 rounded-xl hover:shadow-xl transition duration-300 space-y-4 text-left">
                            <div>{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-700">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesOverview;
