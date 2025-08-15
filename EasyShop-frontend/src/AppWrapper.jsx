import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "./features/UserSlice";

export default function AppWrapper({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userStore);
  useEffect(() => {
    console.count("appwrapper");
    ////("appwapper");

    dispatch(userFetch({ url: "/join/profile" }));
  }, [dispatch, Cookies.get("token")]);

  useEffect(() => {
    localStorage.setItem("theme", user?.theme ? "true" : "false");
  }, [user]);

  ////(user);

  return children;
}
