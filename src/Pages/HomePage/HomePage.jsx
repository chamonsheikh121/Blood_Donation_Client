import { Helmet } from "react-helmet";
import Banner from "../../Components/Shared/Banner";
import ContactUs from "./ContactUs";
import Featured from "./Featured";
import Footer from "./Footer";
import PeopleComments from "./PeopleComments";
import UseVolunteers from "../../Hooks/UseVolunteers";
import UseUser from "../../Hooks/UseUser";



const HomePage = () => {

    const [volunteers, isLoading] = UseVolunteers();
    const [users] = UseUser()
    


    return (
        <div>
            <Helmet>
                <title>
                    Home
                </title>
            </Helmet>
            <Banner></Banner>
            <Featured></Featured>
            {
                isLoading ? <p className="loading"></p> : volunteers?.length > 0 ? <ContactUs volunteers={volunteers} isLoading={isLoading}></ContactUs> : <div><p>No Volunteer Found</p></div>
            }
            <PeopleComments></PeopleComments>

            <Footer></Footer>
        </div>
    );
};

export default HomePage;