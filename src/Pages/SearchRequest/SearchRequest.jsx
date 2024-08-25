import { useRef } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Footer from "../HomePage/Footer";

const SearchRequest = () => {
    const value = useRef()
    // const axiosPublic = UseAxiosPublic()
    const navigate = useNavigate()
    const searchValue = useParams()
    console.log(searchValue);

    const handleSearchRequest = async () => {
        const inputValue = value.current.value;
        if (/^\d+$/.test(inputValue)) {
            const serialNumber = parseInt(inputValue);
            console.log(serialNumber);
            navigate(`/search-request/${serialNumber}`)
            return;
        }
        else {
                navigate(`/search-request/${inputValue}`)
        }

    }
    return (
        <div className="min-h-screen">
            <div className='max-w-xl flex flex-col md:flex-row justify-center items-center gap-2 md:gap-10 p-5 mt-10 mx-auto bg-purple-600'>
                <input defaultValue={searchValue?.id} ref={value} className='flex-1 rounded-sm py-2 text-xl px-10' type="text" placeholder='Request Id or serial-number' />
                <button onClick={handleSearchRequest} className='btn px-10'>Search</button>
            </div>
            
            <Outlet></Outlet>
          <div className="mt-32">
          <Footer></Footer>
          </div>
        </div>
    );
};

export default SearchRequest;