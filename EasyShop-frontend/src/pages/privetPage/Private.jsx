import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router";
import Loading from "../../Layout/Loading";
import { useEffect } from "react";
import { userFetch } from "../../features/UserSlice";

const PrivetRout = ({ children }) => {
  const user = useSelector((state) => state.userStore);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.user && !user?.loading) {
      return navigate("/auth/login", { replace: true });
    }
  }, [user.loading]);

  useEffect(() => {
    dispatch(userFetch({ url: "/join/profile" }));
  }, []);

  const userCalling = () => {
    dispatch(userFetch({ url: "/join/profile" }));
  };
  if (user?.loading) {
    return <Loading />;
  }
  // if (!user.user && !user?.loading) {
  //   return <Navigate to={"/auth/login"} replace></Navigate>;
  // }

  return <>{children} </>;
};

export default PrivetRout;
