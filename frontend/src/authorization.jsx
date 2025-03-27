import { Navigate, useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

export const PublicOnlyRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);
    
    if (token) {
      return <Navigate to="/" replace />;
    }
    
    return children;
};

export const PrivateRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);
    const location = useLocation();
    
    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    return children;
  };