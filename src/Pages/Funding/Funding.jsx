import Lottie from "react-lottie";
import animationData from './../../assets/Animation - 1724145465979.json'

const Funding = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className="flex items-center justify-center">
            <Lottie options={defaultOptions} height={700} width={700} speed={2.5} />
        </div>
    );
};

export default Funding;