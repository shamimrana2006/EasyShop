import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router";
import Loading from "../../Layout/Loading";
import { useEffect, useState } from "react";
import { userFetch } from "../../features/UserSlice";
import { FaMoon, FaSun } from "react-icons/fa";

const PrivetRout = ({ children }) => {
  const user = useSelector((state) => state.userStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDark, setIsDark] = useState(true);

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

  return (
    <>
      {children}
      <div className="w-full transition-all duration-1000 h-screen flex justify-center items-center">
        
      </div>
    </>
  );
};

export default PrivetRout;
