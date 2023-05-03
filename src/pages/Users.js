import { json, useLoaderData } from "react-router-dom";
import UsersList from "../components/UsersList";
import UsersNavigation from "../components/UsersNavigation";

const Users = () => {
  const data = useLoaderData();
  return (
    <>
      <UsersNavigation />
      <UsersList users={data} />
    </>
  );
};

export default Users;

export async function loader() {
  const response = await fetch("http://localhost:8080/users");

  if (!response.ok) {
    //return { isError: true, message: "Could not fetch event" };
    // throw { message: "Could not fetch events." };
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });

    return json(
      { message: "Could not fetch events.", error: true },
      { status: 500 }
    );
  } else {
    return await response.json();
  }
}
