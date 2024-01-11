import { useContext, useState } from "react";
import "./LoginPage.css";
import { UserContext } from "../../Context/UserContext";

const LoginFormPage = () => {
  const { login } = useContext(UserContext);
  const [loginForm, setLoginForm] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const formData = {
    username: name,
    password: password,
  };

  return (
    <div className="loginPage">
      <div className="form">
        <div className="shiftDiv">
          <div
            style={{
              backgroundColor: !loginForm && "#eaeaea",
              color: !loginForm && "#7F9B9D",
            }}
            onClick={() => setLoginForm(true)}
            className="logInForm"
          >
            Logga in
          </div>
          <div
            style={{
              backgroundColor: loginForm && "#eaeaea",
              color: loginForm && "#7F9B9D",
            }}
            onClick={() => setLoginForm(false)}
            className="registrate"
          >
            Registrera
          </div>
        </div>
        {loginForm ? (
          <div className="loginForm">
            <label>Namn</label>
            <input
              placeholder="Namn"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="">Lösenord</label>
            <input
              placeholder="Lösenord"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => login(formData)}>Logga in</button>
            <a href="#">Återställ lösenord</a>
          </div>
        ) : (
          <div className="registrateForm">
            <label htmlFor="email">E-post</label>
            <input placeholder="E-post" type="email" />
            <label htmlFor="name"></label>
            <input placeholder="e.g. John Doe" type="text" />
            <label htmlFor="">Lösenord</label>
            <input placeholder="Lösenord" type="password" />
            <label htmlFor="">Bekräfta Lösenord</label>
            <input placeholder="Lösenord" type="password" />
            <button type="submit">Registrera dig</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginFormPage;
