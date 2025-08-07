import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "./features/UserSlice";

export default function AppWrapper({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userStore);
  useEffect(() => {
    console.count("appwrapper");
    console.log("appwapper");

    dispatch(userFetch({ url: "/join/profile" }));
  }, [dispatch, Cookies.get("token")]);

  useEffect(() => {
    if (user?.user?.payLoad?.isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [user]);

  console.log(user);

  return children;
}
