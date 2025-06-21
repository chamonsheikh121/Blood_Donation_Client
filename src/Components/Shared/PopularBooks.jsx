import img1 from '../../assets/_English_1st_Paper_Higher_Secondary-Professor_Shahab_Uddin-4a613-286097.jpg'
import img2 from '../../assets/ICT_Board_Question_Analysis_and_Suggesti-Md_Shahin_Mia-a0c80-471221.jpg'
import img3 from '../../assets/Tothyo_o_Jogajog_Projukti-Mahbubur_Rahman_ICT-03c8e-425595.jpg'

const popularBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    img: img1,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    img: img2,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    img: img3,
  },
];

const PopularBooks = () => {
  return (
    <section className="max-w-7xl mx-auto my-20 px-4">
      <h2 className="text-3xl font-bold mb-10 text-center">Popular Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {popularBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow p-4 text-center">
            <img src={book.img} alt={book.title} className="mx-auto h-48 object-cover rounded" />
            <h3 className="mt-4 font-semibold text-xl">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            <button className="mt-3 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularBooks;
