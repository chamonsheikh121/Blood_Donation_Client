import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(book)
  // Modal state
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const { user } = useContext(AuthContext)

  // Borrow form states
  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");



 const borrowBookLocally = () => {
  try {
    // Get existing record from localStorage
    let record = JSON.parse(localStorage.getItem("borrowRecord"));

    if (!record) {
      // If no record exists, create new
      record = {
        email: user,
        borrowedBooks: [],
        borrowingHistory: {
          totalBooksBorrowed: 0,
          currentlyBorrowed: 0,
          overdueBooks: 0,
          lastBorrowedDate: null,
          returnDueDate: null,
        },
        notification: [],  // <-- initialize as array
      };
    }

    // Fix check for already borrowed book (compare to new book)
    const isAlreadyBorrowed = record.borrowedBooks.find(b => b.title === book.title);

    if (isAlreadyBorrowed) {
      Swal.fire("This book already borrowed");
      return;
    }

    // Use user-selected dates here
    const borrowedDate = fromDate;  // from input date picker
    const dueDateString = toDate;   // from input date picker

    const borrowedBookObj = {
      bookId: book.id,
      title: book.title,
      author: book.author,
      image: book.image,
      borrowedDate: borrowedDate,
      dueDate: dueDateString,
      returned: false,
    };

    // Add new book
    record.borrowedBooks.push(borrowedBookObj);

    // Update history
    record.borrowingHistory.totalBooksBorrowed += 1;
    record.borrowingHistory.currentlyBorrowed = record.borrowedBooks.filter((b) => !b.returned).length;
    record.borrowingHistory.lastBorrowedDate = borrowedDate;
    record.borrowingHistory.returnDueDate = dueDateString;

    // Calculate overdue books based on current date
    const today = new Date();
    record.borrowingHistory.overdueBooks = record.borrowedBooks.filter(
      (b) => !b.returned && new Date(b.dueDate) < today
    ).length;

    // Add new notification to the array
    const newNotification = {
      bookName: book.title,
      message: `Borrowed book "${book.title}" successfully`,
      timestamp: new Date().toISOString(),
    };

    if (!Array.isArray(record.notification)) {
      record.notification = [];
    }
    record.notification.push(newNotification);

    // Save back to localStorage
    localStorage.setItem("borrowRecord", JSON.stringify(record));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });

    setShowBorrowModal(false);
    return record;

  } catch (error) {
    console.error("Failed to borrow book locally:", error);
    alert("Failed to borrow book locally. Please try again.");
  }
};










  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => {
        const foundBook = data.find((b) => b.id === parseInt(id));
        setBook(foundBook);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
        setLoading(false);
      });
  }, [id]);

  const resetForm = () => {
    setUserName("");
    setUserContact("");
    setFromDate("");
    setToDate("");
  };

  

  if (loading) {
    return <div className="text-center py-20 text-lg">Loading book details...</div>;
  }

  if (!book) {
    return <div className="text-center py-20 text-xl">Book not found</div>;
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 md:px-16 py-10 text-gray-800">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-auto rounded-md shadow-md  max-h-[600px]"
        />

        <div>
          <h1 className="text-4xl font-bold text-green-700 mb-2">{book.title}</h1>
          <h2 className="text-xl text-gray-600 mb-4">by {book.author}</h2>
          <div className="flex items-center mb-4 text-yellow-500">
            <FaStar className="mr-1" />
            <span className="text-sm">{book.rating} / 5</span>
          </div>

          <hr className="border-2 my-5" />
          <p className="text-gray-700 mb-6">{book.description}</p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-8">
            <table className="min-w-full text-sm text-left text-gray-600">
              <tbody>
                <tr className="border-b">
                  <th className="px-4 py-3 font-medium bg-gray-50 w-1/3">Genre</th>
                  <td className="px-4 py-3">{book.genre}</td>
                </tr>
                <tr className="border-b">
                  <th className="px-4 py-3 font-medium bg-gray-50">Pages</th>
                  <td className="px-4 py-3">{book.pages}</td>
                </tr>
                <tr className="border-b">
                  <th className="px-4 py-3 font-medium bg-gray-50">Language</th>
                  <td className="px-4 py-3">{book.language}</td>
                </tr>
                <tr className="border-b">
                  <th className="px-4 py-3 font-medium bg-gray-50">Publisher</th>
                  <td className="px-4 py-3">{book.publisher}</td>
                </tr>
                <tr className="border-b">
                  <th className="px-4 py-3 font-medium bg-gray-50">Published</th>
                  <td className="px-4 py-3">{book.publishedDate}</td>
                </tr>
                <tr>
                  <th className="px-4 py-3 font-medium bg-gray-50">Availability</th>
                  <td className="px-4 py-3">
                    {book.availability ? (
                      <span className="inline-block px-2 py-1 text-green-600 bg-green-100 rounded-full text-xs">Available</span>
                    ) : (
                      <span className="inline-block px-2 py-1 text-red-600 bg-red-100 rounded-full text-xs">Not Available</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


          {book.availability ? (
            <button
              onClick={() => setShowBorrowModal(true)}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition"
            >
              Borrow this Book
            </button>
          ) : (
            <p className="text-red-500 font-semibold">Currently Unavailable</p>
          )}

          <button
            onClick={() => navigate(-1)}
            className="ml-4 text-gray-500 underline text-sm hover:text-gray-700"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Borrow Modal */}
      {showBorrowModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Borrow {book?.title}</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-semibold mb-1" htmlFor="userName">
                  Your Name
                </label>
                <input
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="userContact">
                  Contact (Phone or Email)
                </label>
                <input
                  id="userContact"
                  type="text"
                  value={userContact}
                  onChange={(e) => setUserContact(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="fromDate">
                  From Date
                </label>
                <input
                  id="fromDate"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="toDate">
                  To Date
                </label>
                <input
                  id="toDate"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowBorrowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={borrowBookLocally}
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Confirm Borrow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookDetails;
