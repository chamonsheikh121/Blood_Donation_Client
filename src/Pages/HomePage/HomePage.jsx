import Banner from "../../Components/Shared/Banner";
import ContactUs from "./ContactUs";
import Featured from "./Featured";
import Footer from "./Footer";
import PeopleComments from "./PeopleComments";



const HomePage = () => {


    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <ContactUs></ContactUs>
            <PeopleComments></PeopleComments>
            <Footer></Footer>
        </div>
    );
};

export default HomePage;