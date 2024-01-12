import { useContext, useState } from "react";
import "./LoginPage.css";
import { UserContext } from "../../Context/UserContext";

const LoginFormPage = () => {
  const { login, registrate } = useContext(UserContext);
  const [loginForm, setLoginForm] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const loginData = {
    username: name,
    password: password,
  };

  const registrationData = {
    email: email,
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
            <button onClick={() => login(loginData)}>Logga in</button>
            <a href="#">Återställ lösenord</a>
          </div>
        ) : (
          <div className="registrateForm">
            <label htmlFor="email">E-post</label>
            <input placeholder="E-post" type="email"               onChange={(e) => setEmail(e.target.value)}
 />
            <label htmlFor="name">Namn</label>
            <input placeholder="e.g. John Doe" type="text"               onChange={(e) => setName(e.target.value)}
 />
            <label htmlFor="">Lösenord</label>
            <input placeholder="Lösenord" type="password"               onChange={(e) => setPassword(e.target.value)}
/>
            <label htmlFor="">Bekräfta Lösenord</label>
            <input placeholder="Lösenord" type="password" />
            <button type="submit" onClick={() => registrate(registrationData)}>Registrera dig</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginFormPage;
