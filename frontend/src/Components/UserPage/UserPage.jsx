/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaTrophy } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { FaPrint } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

import "./UserPage.css";

const UserPage = () => {
  const { user, getUser, loggedinUser, updateUser } = useContext(UserContext);
  const [edit, setEdit] = useState(false);

  const [admin, setAdmin] = useState(true);
  const [username, setUsername] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState();

  const navigateTo = useNavigate();

  const updatedUser = {
    isAdmin: admin,
    email: !email ? loggedinUser.email : email,
    username: !username ? loggedinUser.username : username,
    password: password,
  };

  const handleUpdateUser = () => {
    edit && updateUser(updatedUser);
    !edit ? setEdit(true) : setEdit(false);
  };

  const renderProducts = () => {
    navigateTo("/edit-products");
    console.log("renderProducts");
  };

  useEffect(() => {
    console.log(loggedinUser);
    loggedinUser && getUser();
  }, [loggedinUser]);

  return (
    user && (
      <div className="userPage">
        <h2>Mitt konto</h2>
        <div className="edit">
          <h3>Detaljer</h3>
          <p onClick={() => handleUpdateUser()}>{edit ? "Save" : "Edit"}</p>
        </div>
        {!edit ? (
          <div className="userDiv">
            <div className="nameDiv">
              <p>Namn:</p>
              <p>
                <FaUser /> {user.username}
              </p>
            </div>
            <div className="emailDiv">
              <p>E-post:</p>
              <p>
                <IoMdMail /> {user.email}
              </p>
            </div>
          </div>
        ) : (
          <div className="userDiv">
            <div className="nameDiv">
              <p>Namn:</p>
              <p>
                <FaUser />
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={user.username}
                  type="text"
                />
              </p>
            </div>
            <div className="emailDiv">
              <p>E-post:</p>
              <p>
                <IoMdMail />{" "}
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={user.email}
                  type="text"
                />
              </p>
            </div>
            <div className="passwordDiv">
              <p>Lösenord:</p>
              <p>
                <RiLockPasswordFill />{" "}
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </p>
            </div>
            {user.isAdmin && (
              <div className="adminDiv">
                <p>Admin:</p>
                <p onClick={() => (admin ? setAdmin(false) : setAdmin(true))}>
                  {admin ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                  Du får tillgång till att ändra ordrar, produkter och
                  användarinformation
                </p>
              </div>
            )}
          </div>
        )}

        <div className="handlePayment">
          <p>Hantera betalningsalternativ</p>
        </div>
        <div className="clubpointsDiv">
          <div className="clubpoints">
            <h4>
              <FaTrophy /> Kundklubbspoäng: 0.0
            </h4>
          </div>
          <p>
            Kundklubbsrapport: <FaDownload /> <FaPrint />
          </p>
          <h3>Kontosäkerhet</h3>
        </div>
        {user.isAdmin && (
          <p
            onClick={() => {
              renderProducts();
            }}
          >
            <FaPencilAlt /> Hantera Produkter
          </p>
        )}
      </div>
    )
  );
};

export default UserPage;
