import classes from "./UsersList.module.css";
import { json, redirect, useSubmit, Link } from "react-router-dom";

function UsersList({ users }) {
  const submit = useSubmit();

  function userDeleteHandler(event, userid) {
    event.preventDefault();
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete", action: "/users/" + userid });
    }
  }

  const data = users.map((user) => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</td>
      <td>{user.phone}</td>
      <td>{user.website}</td>
      <td>{user.company.name}</td>
      <td>
        <Link
          to={`${user.id}`}
          className={`${classes.buttonList} ${classes.view}`}
        >
          <span>View </span>
        </Link>
        <Link
          to={`${user.id}/edit`}
          className={`${classes.buttonList} ${classes.update}`}
        >
          <span>Update </span>
        </Link>
        <button
          className={`${classes.buttonList} ${classes.delete}`}
          onClick={(event) => userDeleteHandler(event, user.id)}
        >
          <span>Delete </span>
        </button>
      </td>
    </tr>
  ));

  return (
    <div className={classes.tbl}>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th className={classes.tcenter}>Action</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
    </div>
  );
}

export default UsersList;

export async function loader({ request, params }) {
  console.log(params);
  // cant read hooks inside loader
  const id = params.userId;
  const response = await fetch("http://localhost:8080/users/" + id);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected user." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}

export async function action({ params, request }) {
  const id = params.userId;

  const response = await fetch("http://localhost:8080/users/" + id, {
    method: request.method,
  });
  if (!response.ok) {
    throw json(
      { message: "Could not delete user." },
      {
        status: 500,
      }
    );
  }

  return redirect("/users");
}
