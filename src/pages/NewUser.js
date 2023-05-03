import Modal from "../UI/Modal";
import UserForm from "../components/UserForm.js";

const NewUser = () => {
  return (
    <Modal>
      <UserForm method="post" />
    </Modal>
  );
};

export default NewUser;
