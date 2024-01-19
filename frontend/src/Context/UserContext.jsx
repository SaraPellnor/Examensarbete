/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loggedinUser, setLoggedinUser] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const navigateTo = useNavigate();

  const getUsers = async () => {
    try {
      const data = await fetch("http://localhost:3000/app/user/");
      const res = await data.json();
      setUsers(res);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
    }
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

      setLoggedinUser(res);
      navigateTo("/");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
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
      navigateTo("/");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
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
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };

  const logOutUser = async () => {
    try {
      await fetch("http://localhost:3000/app/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setLoggedinUser();
      navigateTo("/");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      navigateTo("/error");
    }
  };

  useEffect(() => {
    auth();
    getUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        login,
        registrate,
        loggedinUser,
        logOutUser,
        errorMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
