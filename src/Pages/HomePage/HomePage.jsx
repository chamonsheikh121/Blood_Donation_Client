
import Banner from "../../Components/Shared/Banner";
import Featured from './Featured';
import PeopleComments from './PeopleComments';
import FeaturesOverview from "../../Components/Shared/FeaturesOverview ";
import UpcomingEvents from "../../Components/Shared/UpcomingEvents";
import JoinLibrarySection from "../../Components/Shared/JoinLibrarySection";
import FAQ from "../../Components/Shared/FAQ";
import PopularBooks from "../../Components/Shared/PopularBooks";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Providers/AuthProvider";


// afrojabegum14@gmail.com


const HomePage = () => {

const {user} = useContext(AuthContext);
console.log(user)

  useEffect(() => {
      AOS.init({
        duration: 800,  // animation duration in ms
        once: true,     // whether animation happens only once while scrolling down
      });
    }, []);

    return (
        <div className="space-y-32">
           
            <div data-aos="fade-up">
                <Banner></Banner>
            </div>
            <div data-aos="fade-up">
               <Featured></Featured>
            </div>
            <div data-aos="fade-up">
             <PopularBooks></PopularBooks>
            </div>
            <div data-aos="fade-up">
                   <FeaturesOverview></FeaturesOverview>
            </div>
            <div data-aos="fade-up">
                 <UpcomingEvents></UpcomingEvents>
            </div>
            <div data-aos="fade-up">
                  <JoinLibrarySection></JoinLibrarySection>
            </div>
            <div data-aos="fade-up">
                  <FAQ></FAQ>
            </div>
            <div data-aos="fade-up">
                 <PeopleComments></PeopleComments>
            </div>
           
            
           
      
            
          
         
          
          
        </div>
    );
};

export default HomePage;