import { useState } from "react";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Bell } from "lucide-react";
const StudentProfile = () => {
    const [activeTab, setActiveTab] = useState("borrowedBooks");
    const [student, setStudent] = useState(null); // Initially null
    const [borrowedData, setBorrowedData] = useState(null); // or [] depending on structure
    const [notification , setNotifications] = useState()
    console.log(notification);

    console.log(borrowedData)

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });

        const fetchStudentData = async () => {
            try {
                const storedStudent = JSON.parse(localStorage.getItem("student"));
                setStudent(storedStudent);
            } catch (err) {
                console.error("Failed to fetch student data:", err);
            }
        };

        fetchStudentData();
    }, []);

useEffect(() => {
  const storedData = localStorage.getItem("borrowRecord");

  if (storedData) {
    const parsedData = JSON.parse(storedData);

    if (parsedData) {
      setBorrowedData(parsedData);

      if (Array.isArray(parsedData.notification) && parsedData.notification.length > 0) {
        // Sort notifications newest first by timestamp
        const sortedNotifications = [...parsedData.notification].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setNotifications(sortedNotifications);
      } else {
        // If no notifications or empty array
        setNotifications([]);
      }
    }
  } else {
    // No record in localStorage
    setBorrowedData(null);
    setNotifications([]);
  }
}, []);




    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Header Section */}
            <div className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md">
                <img
                    src={student ? student.profileImage : ''}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-2xl font-bold">{student?.name}</h2>
                    <p className="text-gray-600">ID: {student?.studentId}</p>
                    <p className="text-gray-600">Email: {student?.email}</p>
                    <p className="text-gray-600">Department: {student?.department}</p>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="mt-8">
                <nav className="flex border-b border-gray-300">
                    {[
                        { id: "borrowedBooks", label: "Borrowed Books" },
                        { id: "borrowingHistory", label: "Borrowing History" },
                        { id: "fines", label: "Fines / Penalties" },

                        { id: "notifications", label: "Notifications" },
                        { id: "settings", label: "Settings" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-3 px-6 text-sm font-medium ${activeTab === tab.id
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>

                {/* Tab Contents */}
                <div className="mt-6 bg-white p-6 rounded-lg shadow-md min-h-[200px]">
                    {activeTab === "borrowedBooks" && (
                        <div data-aos="fade-up">
                            <h3 className="text-lg font-semibold mb-4">Currently Borrowed Books</h3>

                            {borrowedData?.borrowedBooks && borrowedData?.borrowedBooks.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                                        <thead>
                                            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                                                <th className="px-4 py-2 border">Image</th>
                                                <th className="px-4 py-2 border">Title</th>
                                                <th className="px-4 py-2 border">Author</th>
                                                <th className="px-4 py-2 border">Borrowed Date</th>
                                                <th className="px-4 py-2 border">Due Date</th>
                                                <th className="px-4 py-2 border">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {borrowedData?.borrowedBooks.map((book, index) => (
                                                <tr key={index} className="border-t hover:bg-gray-50">
                                                    <td className="px-4 py-2 border">
                                                        <img src={book.image} alt={book.title} className="w-12 h-16 object-cover rounded" />
                                                    </td>
                                                    <td className="px-4 py-2 border">{book.title}</td>
                                                    <td className="px-4 py-2 border">{book.author}</td>
                                                    <td className="px-4 py-2 border">{book.borrowedDate}</td>
                                                    <td className="px-4 py-2 border">{book.dueDate}</td>
                                                    <td className="px-4 py-2 border">
                                                        {book.returned ? (
                                                            <span className="text-green-600 font-semibold">Returned</span>
                                                        ) : (
                                                            <span className="text-yellow-600 font-semibold">Borrowed</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>No books borrowed currently.</p>
                            )}
                        </div>

                    )}

                    {activeTab === "borrowingHistory" && (
                        <div data-aos="fade-up" className="bg-white p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-6 border-b border-gray-300 pb-2">
                                Borrowing History & Essentials
                            </h3>

                            <div className="space-y-4 text-gray-700">
                                <p>
                                    <strong>Total Books Borrowed:</strong> {borrowedData?.borrowingHistory.totalBooksBorrowed}
                                </p>
                                <p>
                                    <strong>Currently Borrowed:</strong> {borrowedData?.borrowingHistory.currentlyBorrowed}
                                </p>
                                <p>
                                    <strong>Overdue Books:</strong> {borrowedData?.borrowingHistory.overdueBooks}
                                </p>
                                <p>
                                    <strong>Last Borrowed Date:</strong>{" "}
                                    {borrowedData?.borrowingHistory.lastBorrowedDate ? borrowedData?.borrowingHistory.lastBorrowedDate : "N/A"}
                                </p>
                                <p>
                                    <strong>Return Due Date:</strong>{" "}
                                    {borrowedData?.borrowingHistory.returnDueDate ? borrowedData?.borrowingHistory.returnDueDate : "N/A"}
                                </p>
                            </div>
                        </div>


                    )}

                    {activeTab === "fines" && (
                        <div
                            data-aos="fade-up"
                            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-md mx-auto"
                        >
                            <h3 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2 text-red-600">
                                Fines / Penalties
                            </h3>

                            <p className="text-red-700 font-semibold mb-2">
                                You have outstanding fines! Please clear them as soon as possible.
                            </p>

                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                <li>Overdue book: JavaScript Essentials - $0</li>
                                <li>Late return: React Basics - $0</li>
                                <li>Damaged book fee: CSS Mastery - $0.00</li>
                            </ul>
                        </div>

                    )}



                    {activeTab === "notifications" && (
                        <div
                            data-aos="fade-up"
                            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-md mx-auto"
                        >
                            <h3 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-indigo-500" />
                                Notifications
                            </h3>

                            {borrowedData?.sortedNotifications?.length === 0 ? (
                                <p className="text-gray-600 italic">You have no new notifications.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {notification?.map((note, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition"
                                        >
                                            <div className="flex-shrink-0">
                                                <Bell className="text-indigo-500 w-5 h-5 mt-1" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-800 font-medium">
                                                    {note.bookName}
                                                </p>
                                                <p className="text-sm text-gray-600">{note.message}</p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date(note.timestamp).toLocaleString()}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                    )}

                    {activeTab === "settings" && (
                        <div
                            data-aos="fade-up"
                            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-md mx-auto"
                        >
                            <h3 className="text-xl font-semibold mb-6 border-b border-gray-300 pb-2">
                                Account Settings
                            </h3>

                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                                        placeholder="Enter your username"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                                >
                                    Save Settings
                                </button>
                            </form>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
