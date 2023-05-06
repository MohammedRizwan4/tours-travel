import { Navigate, useRevalidator } from 'react-router-dom'
import { useSelector } from 'react-redux';

const UserPrivateRoute = ({ children }) => {
    const { user } = useSelector((state) => state.authReducer);
    return user ? children : <Navigate to="/" />
}

export default UserPrivateRoute;
