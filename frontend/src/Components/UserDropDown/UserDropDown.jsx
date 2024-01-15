import { useContext } from "react";
import { Link } from "react-router-dom";
import "./UserDropDown.css";
import { UserContext } from "../../Context/UserContext";
const UserDropDown = () => {
  const { loggedinUser, logOutUser } = useContext(UserContext);
  return (
    <div className="userDropDown">
      {loggedinUser.username && (
        <p>
          {loggedinUser.is_admin ? "Admin" : loggedinUser.username}
        </p>
      )}
      {loggedinUser.username && (
        <Link to={"/orders"}>
          <p>Orders</p>
        </Link>
      )}
      {loggedinUser.username ? (
        <p onClick={ () => logOutUser()}>Logga ut</p>
      ) : (
        <Link to={"/login"}>
          <p>Logga in</p>{" "}
        </Link>
      )}
    </div>
  );
};

export default UserDropDown;
