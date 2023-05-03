import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import classes from "../components/LoadingSpinner.module.css";

function Root() {
  const navigation = useNavigation();

  let content;
  if (navigation.state === "loading") {
    content = <div className={classes.loading_spinner}></div>;
  }

  return (
    <>
      <MainNavigation />
      <main>
        {content}
        <Outlet />
      </main>
    </>
  );
}

export default Root;
