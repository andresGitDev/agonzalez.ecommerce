import {Navigate, Outlet,  useLocation } from 'react-router-dom';
  
export const PublicRoute = ({user,redirectPath = '/', children,}) => {
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

  
export const ProtectedRoute = ({user,redirectPath = '/',children,}) => {
    const location = useLocation()
    if (!user) {
        return <Navigate to={redirectPath}  state={{ from: location }} replace />;
    }
    return children ? children : <Outlet />;
};
