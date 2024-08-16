import { Helmet } from "react-helmet";
import Banner from "../../Components/Shared/Banner";
import ContactUs from "./ContactUs";
import Featured from "./Featured";
import Footer from "./Footer";
import PeopleComments from "./PeopleComments";
import UseVolunteers from "../../Hooks/UseVolunteers";



const HomePage = () => {

    const [volunteers, isLoading] = UseVolunteers();


    return (
        <div>
            <Helmet>
                <title>
                    Home 
                </title>
            </Helmet>
            <Banner></Banner>
            <Featured></Featured>
            <ContactUs volunteers={volunteers} isLoading={isLoading}></ContactUs>
            <PeopleComments></PeopleComments>

            <Footer></Footer>
        </div>
    );
};

export default HomePage;