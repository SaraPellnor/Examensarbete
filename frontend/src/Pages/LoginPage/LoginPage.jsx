import { useContext, useState } from "react";
import { useNavigate} from "react-router-dom"
import "./LoginPage.css";
import { UserContext } from "../../Context/UserContext";

const LoginFormPage = () => {
  const navigateTo = useNavigate()
  // ----- Accessing login and registrate functions from UserContext

  const { login, registrate, setComfirmedPassword, loggedinUser } = useContext(UserContext);
  loggedinUser && navigateTo("/user")

  // ----- State to track the active form (login or registration)

  const [loginForm, setLoginForm] = useState(true);

  // ----- State variables for user input (name, email, password)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // ----- Data object for login

  const loginData = {
    email: email,
    password: password,
  };

  // ----- Data object for registration

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

        {/* Conditional rendering based on the active form */}

        {loginForm ? (
          // ----- Login form

          <div className="loginForm">
            <label>E-post</label>
            <input
              placeholder="E-post"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
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

          // ----- Registration form

          <div className="registrateForm">
            <label htmlFor="email">E-post</label>
            <input
              placeholder="E-post"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="name">Namn</label>
            <input
              placeholder="e.g. John Doe"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="">Lösenord</label>
            <input
              placeholder="Lösenord"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="">Bekräfta Lösenord</label>
            <input
              placeholder="Bekräfta lösenord"
              type="password"
              onChange={(e) => setComfirmedPassword(e.target.value)}
            />
            <button type="submit" onClick={() => registrate(registrationData)}>
              Registrera dig
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginFormPage;
