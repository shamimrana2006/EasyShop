import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Loading from "../../Layout/Loading";


const PrivetRout = ({ children }) => {
  const user = useSelector((state) => state.userStore);

  if (user.loading) {
    return <Loading />;
  }

  if (!user.user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default PrivetRout;
