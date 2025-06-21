import { Link } from "react-router-dom";

const JoinLibrarySection = () => {
  return (
    <section className="max-w-7xl mx-auto my-20 px-4 md:px-20 flex flex-col md:flex-row items-center gap-10">
      {/* Image Side */}
      <div className="md:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
          alt="Library Membership"
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      {/* Content Side */}
      <div className="md:w-1/2 flex flex-col justify-center space-y-6">
        <h2 className="text-4xl font-bold text-gray-800">
          Become a Member of Our Library
        </h2>
        <p className="text-gray-600 text-lg">
          Join our community to access thousands of books, participate in
          exclusive events, and enjoy a world of knowledge at your fingertips.
          Sign up today and start exploring!
        </p>
        <Link to="/register">
          <button className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded shadow-lg transition duration-300">
            Join Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default JoinLibrarySection;
