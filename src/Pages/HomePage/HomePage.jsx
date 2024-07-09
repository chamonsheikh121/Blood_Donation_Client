import Banner from "../../Components/Shared/Banner";
import ContactUs from "./ContactUs";
import Featured from "./Featured";



const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <ContactUs></ContactUs>
        </div>
    );
};

export default HomePage;