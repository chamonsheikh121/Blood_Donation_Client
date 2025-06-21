import { useEffect, useState } from "react";
import { FaFilter, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const ExploreBooks = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [books, setBooks] = useState([]); // fetched books
    console.log(books)
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [selectedSemesterCode, setSelectedSemester] = useState()
    const [minRating, setMinRating] = useState("");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Extract authors from fetched books
const authors = [
  "Arifin Islam",
  "Eng. Abdullah Ibne Nazim",
  "Eng. Kabir Mahmud",
  "Eng. Towhid Hossen",
  "Engineer Md. Abul Kalam Azad",
  "Md. Abu Taleb",
  "Md. Al-Amin Mida",
  "Md. Alamgir Hossain",
  "Md. Azim Uddin Sardar",
  "Md. Deloyar Hossain",
  "Md. Golam Mostafa",
  "Md. Golam Rahman",
  "Md. Habibur Rahman",
  "Md. Hasan",
  "Md. Mahbub Alam",
  "Md. Mahbubur Rahman khan",
  "Md. Masud Rana",
  "Md. Mehedi Hasan",
  "Md. Mohsin Ali",
  "Md. Mojibur Rahman",
  "Md. Moshiur Rahman",
  "Md. Mostofa Zaman",
  "Md. Sakhawat Hossain",
  "Md. Sajjadul Islam",
  "Md. Sirajul Islam",
  "Md. Yeasin Ali",
  "Mridul Debnath",
  "Narayon Chandra Bosak",
  "Prof. Dr. Md. Hossain Ali",
  "Rafiq Ahmed",
  "Zahirul Quader Rana"
];


    // Filter books based on filters and search text
    const filteredBooks = books.filter((book) => {
        const matchesAuthor = selectedAuthor ? book.author === selectedAuthor : true;
        const matchesRating = minRating ? book.rating >= parseFloat(minRating) : true;
        const matchesSemester = selectedSemesterCode ? book.semesterCode === parseInt(selectedSemesterCode) : true;
        const matchesSearch =
            book.title.toLowerCase().includes(searchText.toLowerCase()) ||
            book.author.toLowerCase().includes(searchText.toLowerCase());

        return matchesAuthor && matchesRating && matchesSemester && matchesSearch;
    });


    // Pagination slice
    const indexOfLastBook = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstBook = indexOfLastBook - ITEMS_PER_PAGE;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const handleReset = () => {
        setSelectedAuthor("");
        setMinRating("");
        setSearchText("");
    };

    useEffect(() => {
        fetch("/books.json")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => {
                setBooks(data);
            })
            .catch((error) => {
                console.error("Error fetching book data:", error);
            });
    }, []);

    return (
        <section className="min-h-screen py-10 px-4 md:px-16 bg-gradient-to-b from-gray-50 to-white text-gray-800 relative">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center my-10">Explore all books</h1>

                {/* Search + Filter */}
                <div className="flex p-5 shadow-md flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex w-full md:w-2/3">
                        <input
                            type="text"
                            placeholder="Search books by title or author..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={() => setCurrentPage(1)} // reset page on search
                            className="bg-green-600 text-white px-5 rounded-r-md hover:bg-green-700"
                        >
                            Search
                        </button>
                    </div>
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 border border-green-500 rounded hover:bg-green-200"
                    >
                        <FaFilter />
                        Filter
                    </button>
                </div>

                {/* Filter Popup */}
                {filterOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-white shadow-lg p-6 rounded-xl border border-gray-200 mb-8"
                    >
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Author Filter */}
                            <div>
                                <label className="block font-semibold mb-2">Author</label>
                                <select
                                    value={selectedAuthor}
                                    onChange={(e) => setSelectedAuthor(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded"
                                >
                                    <option value="">All Authors</option>
                                    {authors.map((author, i) => (
                                        <option key={i} value={author}>
                                            {author}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Minimum Rating Filter */}
                            <div>
                                <label className="block font-semibold mb-2">Minimum Rating</label>
                                <select
                                    value={minRating}
                                    onChange={(e) => setMinRating(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded"
                                >
                                    <option value="">All Ratings</option>
                                    <option value="3">3+</option>
                                    <option value="4">4+</option>
                                    <option value="4.5">4.5+</option>
                                </select>
                            </div>

                            {/* Semester Filter */}
                            <div>
                                <label className="block font-semibold mb-2">Semester</label>
                                <select
                                    value={selectedSemesterCode}
                                    onChange={(e) => setSelectedSemester(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded"
                                >
                                    <option value="">All Semesters</option>
                                    {[1, 2, 3, 4, 5, 6, 7].map((semester) => (
                                        <option key={semester} value={semester}>
                                            Semester {semester}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setFilterOpen(false)}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Apply
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Book Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {currentBooks.map((book) => (
                        <div
                            key={book.id}
                            className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transform hover:scale-[1.03] transition duration-300  flex flex-col"
                        >
                            <div className=" overflow-hidden mb-4 h-72">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-full "
                                    loading="lazy"
                                />
                            </div>

                            <div className="flex-1 p-4 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">{book.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                                    <div className="flex items-center text-yellow-400 text-sm mb-3">
                                        <FaStar className="mr-1" />
                                        <span>{book.rating.toFixed(1)}</span>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <Link to={`/book/${book.id}`}>
                                        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-10">
                    <div className="inline-flex space-x-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Prev
                        </button>
                        {Array.from({ length: Math.ceil(filteredBooks.length / ITEMS_PER_PAGE) }).map(
                            (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-2 rounded ${currentPage === index + 1 ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}
                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, Math.ceil(filteredBooks.length / ITEMS_PER_PAGE))
                                )
                            }
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExploreBooks;
