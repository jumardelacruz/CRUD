import { useRouteLoaderData } from "react-router-dom";
import UserForm from "../components/UserForm";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";

const EditUser = () => {
  const data = useRouteLoaderData("user-edit-detail");

  return (
    <Modal>
      <UserForm method="PATCH" user={data} />
    </Modal>
  );
};

export default EditUser;
