import { Outlet } from "react-router-dom";
// import UsersNavigation from "../components/UsersNavigation";

function UsersRoot() {
  return (
    <>
      {/* <UsersNavigation /> */}
      <Outlet />
    </>
  );
}

export default UsersRoot;
