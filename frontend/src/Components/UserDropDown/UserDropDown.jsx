import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

import "./UserDropDown.css";


const UserDropDown = () => {


  // ----- Destructuring necessary functions and data from context

  const { loggedinUser, logOutUser } = useContext(UserContext);

  return (
    <div className="userDropDown">


      {/* Displaying user information and navigation links based on authentication status */}
     
      {loggedinUser && (
       <Link to={"/user"}> <p>{loggedinUser.is_admin ? "Admin" : loggedinUser.username}</p></Link>
      )}
      {loggedinUser && (
        <Link to={"/orders"}>
          <p>Ordrar</p>
        </Link>
      )}
      {loggedinUser ? (
        <p onClick={() => logOutUser()}>Logga ut</p>
      ) : (
        <Link to={"/login"}>
          <p>Logga in</p>{" "}
        </Link>
      )}
    </div>
  );
};

export default UserDropDown;
