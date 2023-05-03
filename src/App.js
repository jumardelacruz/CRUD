import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Users, { loader as usersLoader } from "./pages/Users";
import {
  loader as userDetailLoader,
  action as deleteUserAction,
} from "./components/UsersList";
import UserDetail from "./pages/UserDetail";
import NewUser from "./pages/NewUser";
import EditUser from "./pages/EditUser";
import Root from "./pages/Root";
import UsersRoot from "./pages/UsersRoot";
import ErrorPage from "./pages/Error";
import { action as newUserAction } from "./components/UserForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "users",
        element: <UsersRoot />, //just added for additional navigation for the user soon
        children: [
          { index: true, element: <Users />, loader: usersLoader },
          {
            path: ":userId",
            id: "user-detail",
            element: <UserDetail />,
            loader: userDetailLoader,
            action: deleteUserAction,
          },
          {
            path: "new",
            element: <NewUser />,
            action: newUserAction,
          },
          {
            path: ":userId/edit",
            id: "user-edit-detail",
            element: <EditUser />,
            loader: userDetailLoader,
            action: newUserAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
