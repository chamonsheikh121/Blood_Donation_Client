import { BiBookAlt } from "react-icons/bi";
import { GiArchiveRegister } from "react-icons/gi";
import { TbDeviceAnalytics } from "react-icons/tb";

const Featured = () => {
    return (
        <div>
            <div className="max-w-7xl mx-auto py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:p-10 p-1 gap-10">
                    <div className="bg-white rounded-md shadow-md">
                        <div className="p-10 text-center space-y-2">
                            <BiBookAlt className="mx-auto text-green-700" size={40} />
                            <p className="text-xl font-semibold text-gray-600">Extensive Book Collection</p>
                            <p>
                                Explore a vast digital and physical collection of academic books, novels, journals, and research materials.
                                Our well-curated resources support all kinds of readers, from students to lifelong learners.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-md shadow-md">
                        <div className="p-10 text-center space-y-2">
                            <GiArchiveRegister className="mx-auto text-green-700" size={40} />
                            <p className="text-xl font-semibold text-gray-600">Easy Borrowing & Returns</p>
                            <p>
                                With a user-friendly system, borrowing and returning books is fast and simple. 
                                Track your borrowings, due dates, and renew books with just a few clicks anytime, anywhere.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-md shadow-md">
                        <div className="p-10 text-center space-y-2">
                            <TbDeviceAnalytics className="mx-auto text-green-700" size={40} />
                            <p className="text-xl font-semibold text-gray-600">Smart Dashboard & Insights</p>
                            <p>
                                Get personalized recommendations, reading history, and usage insights. 
                                Our smart dashboard helps you stay organized and makes your learning journey more efficient.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
