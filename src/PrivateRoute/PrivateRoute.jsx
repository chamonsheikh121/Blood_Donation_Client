
import { PropTypes } from 'prop-types';
import UseAuthContext from '../Hooks/UseAuthContext';
import { Navigate } from 'react-router-dom';
import { DNA } from 'react-loader-spinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuthContext();
    if (loading) {
        return <div className='w-full flex items-center justify-center mt-20'><DNA
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
        /></div>
    }
    if (user) {
        return children
    }
    console.log('hi',user, loading);
    return <Navigate to='/login'></Navigate>
};

export default PrivateRoute;
PrivateRoute.propTypes = {
    children: PropTypes.node
}