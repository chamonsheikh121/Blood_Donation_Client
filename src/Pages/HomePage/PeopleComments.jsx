import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { PiStarBold } from "react-icons/pi";

// Dummy data as an example
const initialComments = [
    {
        _id: "1",
        name: "Alice Johnson",
        image: "https://i.pravatar.cc/100?img=1",
        review: "This library system is amazing. Easy to borrow books and a great selection!",
        rating: 5
    },
    {
        _id: "1",
        name: "Alice Johnson",
        image: "https://i.pravatar.cc/100?img=1",
        review: "This library system is amazing. Easy to borrow books and a great selection!",
        rating: 5
    },
    {
        _id: "2",
        name: "Rahul Sharma",
        image: "https://i.pravatar.cc/100?img=2",
        review: "Clean interface and fast searching. Highly recommend!",
        rating: 4
    }
];

const PeopleComments = () => {
    const [comments, setComments] = useState(initialComments);

    const handleAdd = () => {
        alert("Add review functionality coming soon!");
    };

    return (
        <div
            id="peopleComments"
            className="my-20 max-w-7xl mx-auto px-4"
        >
            <h1 className="text-3xl font-bold text-gray-700 text-center mb-10">
                <span className="border-b-4 pb-2 border-gray-500">People Reviews</span>
            </h1>

            <div className="flex justify-end mb-4">
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                >
                    <FaEdit /> Add Review
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comments.map((comment) => (
                    <div
                        key={comment._id}
                        className="bg-white rounded-md shadow p-6 flex flex-col items-center text-center space-y-4"
                    >
                        <img
                            src={comment.image}
                            alt={comment.name}
                            className="w-20 h-20 rounded-full object-cover"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">{comment.name}</h3>
                        <p className="text-gray-600 text-sm">{comment.review}</p>
                        <div className="flex text-xl">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <PiStarBold
                                    key={star}
                                    className={star <= comment.rating ? "text-yellow-400" : "text-gray-300"}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PeopleComments;
