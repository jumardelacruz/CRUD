import classes from "./UserItem.module.css";
import { useNavigate } from "react-router-dom";
function UserItem({ user }) {
  const navigate = useNavigate();

  function cancelHandler() {
    navigate("..");
  }

  return (
    <>
      <table className={classes.tblView}>
        <tbody>
          <tr>
            <td className={classes.alignRight}>Name :</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td className={classes.alignRight}>Email :</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td className={classes.alignRight}>Address :</td>
            <td>
              {`${user.address.street} ${user.address.suite} ${user.address.city} ${user.address.zipcode}`}
            </td>
          </tr>
          <tr>
            <td className={classes.alignRight}>Phone :</td>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <td className={classes.alignRight}>Website :</td>
            <td>{user.website}</td>
          </tr>
          <tr>
            <td className={classes.alignRight}>Company :</td>
            <td>{user.company.name}</td>
          </tr>
        </tbody>
      </table>

      <div className={classes.divCenter}>
        <button
          className={`${classes.button} ${classes.close}`}
          onClick={cancelHandler}
        >
          Close
        </button>
      </div>
    </>
  );
}

export default UserItem;
