/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loggedinUser, setLoggedinUser] = useState();
  const navigateTo = useNavigate()


  const getUsers = async () => {
    const data = await fetch("http://localhost:3000/app/user/");
    const res = await data.json();
    setUsers(res);
  };

  const login = async (user) => {
    try {
      const data = await fetch("http://localhost:3000/app/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });
      const res = await data.json();
      console.log(res);

      setLoggedinUser(res);
      navigateTo("/")
    } catch (error) {
      console.log(error);
    }
  };

  const registrate = async (user) => {
    try {
      const data = await fetch("http://localhost:3000/app/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });
      const res = await data.json();
      setLoggedinUser(res);
      navigateTo("/")
    } catch (error) {
      console.log(error);
    }
  };

  const auth = async () => {
    try {
      const data = await fetch("http://localhost:3000/app/user/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const res = await data.json();

      setLoggedinUser(res);
    } catch (error) {
      console.log(error);
    }
  };

  const logOutUser = async () => {
    try {
      const data = await fetch("http://localhost:3000/app/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });      const res = await data.json();
      !res && console.log("Något gick fel vid utloggningen");
      setLoggedinUser();
      navigateTo("/")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    auth();
    getUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{ users, login, registrate, loggedinUser, logOutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
