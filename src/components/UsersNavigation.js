import { NavLink } from "react-router-dom";
import classes from "./UsersNavigation.module.css";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";

function UsersNavigation() {
  const showModal = useSelector((state) => state.user.showAddButton);
  const dispatch = useDispatch();

  const showModalHandler = () => {
    dispatch(userActions.validateForm(false));
  };

  const content = (
    <nav>
      <ul>
        <li>
          <NavLink
            onClick={showModalHandler}
            to="new"
            className={`${classes.button} ${classes.new}`}
          >
            <span>Add </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );

  return <header className={classes.header}>{content}</header>;
}

export default UsersNavigation;
