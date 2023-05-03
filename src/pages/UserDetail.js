import { useRouteLoaderData } from "react-router-dom";
import Modal from "../UI/Modal";
import UserItem from "../components/UserItem";

function UserDetail() {
  const data = useRouteLoaderData("user-detail");
  console.log(data);
  return (
    <Modal>
      <UserItem user={data} />
    </Modal>
  );
}

export default UserDetail;
