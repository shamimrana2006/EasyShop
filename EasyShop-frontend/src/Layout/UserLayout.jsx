import { Outlet } from "react-router";

const UserLayout = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

export default UserLayout;
