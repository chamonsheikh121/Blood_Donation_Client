import { useState,useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import 'aos/dist/aos.css';

import AOS from 'aos';
import 'aos/dist/aos.css';


const BookManagement = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-help",
      published: "2018",
      status: "Available",
    },
    {
      id: 2,
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Fiction",
      published: "1988",
      status: "Borrowed",
    },
    // Add more dummy books as needed
  ]);

  const handleEdit = (id) => {
    console.log("Edit book with ID:", id);
    // Implement edit logic here
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      setBooks((prev) => prev.filter((book) => book.id !== id));
    }
  };
useEffect(() => {
      AOS.init({
        duration: 800,  // animation duration in ms
        once: true,     // whether animation happens only once while scrolling down
      });
    }, []);
  

  return (
    <div data-aos="fade-up" className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📚 Book Management</h2>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
          <Plus size={18} /> Add New Book
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-700">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4">Genre</th>
              <th className="py-3 px-4">Published</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length ? (
              books.map((book) => (
                <tr key={book.id} className="border-t text-sm">
                  <td className="py-2 px-4">{book.title}</td>
                  <td className="py-2 px-4">{book.author}</td>
                  <td className="py-2 px-4">{book.genre}</td>
                  <td className="py-2 px-4">{book.published}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        book.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(book.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagement;
