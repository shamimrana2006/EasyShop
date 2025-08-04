import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFetch } from "./features/UserSlice";

export default function AppWrapper({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userStore);
  useEffect(() => {
    console.count("appwrapper")
    dispatch(userFetch({ url: "/join/profile" }));
  }, []);

  console.log(user);

  return children;
}
