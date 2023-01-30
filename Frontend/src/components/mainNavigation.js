import { useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";

import NavandSide from "./nav&side";

const MainNavigation = (props) => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    var token = localStorage.getItem("token");
    if (token) {
      authCtx.login(token);
    } else {
      authCtx.logout();
    }
  }, []);

  return (
    <div>{authCtx.isLoggedIn == true && <NavandSide />}</div>
   
  );
};

export default MainNavigation;
