import { useRef } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

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
        <div>
            <div className='max-w-xl flex justify-center items-center gap-10 p-5 mt-10 mx-auto bg-purple-600'>
                <input defaultValue={searchValue?.id} ref={value} className='flex-1 rounded-sm py-2 text-xl px-10' type="text" placeholder='Request Id or serial-number' />
                <button onClick={handleSearchRequest} className='btn px-10'>Search</button>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default SearchRequest;